using Microsoft.AspNet.Identity;
using owinAuthentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

[RoutePrefix("api/Account")]
public class AccountController : ApiController
{
    private AuthRepository _repo = null;

    public AccountController()
    {
        _repo = new AuthRepository();
    }

    // POST api/Account/Register
    [AllowAnonymous]
    [Route("Register")]
    public async Task<IHttpActionResult> Register(owinAuthentication.Models.UserModel userModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        IdentityResult result = await _repo.RegisterUser(userModel);

        IHttpActionResult errorResult = GetErrorResult(result);

        if (errorResult != null)
        {
            return errorResult;
        }

        return Ok();
    }

    //Get api/Account/GetUserName
    [Authorize]
    [Route("getUserName")]
    public IHttpActionResult Get()
    {
        
        var R = (((System.Security.Claims.ClaimsIdentity)System.Security.Claims.ClaimsPrincipal.Current.Identity).Claims);
        var N = R.ToList()[0].ToString().Split(':')[1];
        return Ok(N);
    }

    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            _repo.Dispose();
        }

        base.Dispose(disposing);
    }

    private IHttpActionResult GetErrorResult(IdentityResult result)
    {
        if (result == null)
        {
            return InternalServerError();
        }

        if (!result.Succeeded)
        {
            if (result.Errors != null)
            {
                foreach (string error in result.Errors)
                {
                    ModelState.AddModelError("", error);
                }
            }

            if (ModelState.IsValid)
            {
                // No ModelState errors are available to send, so just return an empty BadRequest.
                return BadRequest();
            }

            return BadRequest(ModelState);
        }

        return null;
    }
}
