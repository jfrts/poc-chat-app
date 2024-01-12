using Microsoft.AspNetCore.Mvc;

namespace ChatAPI.Users;

[ApiController, Route("api/users")]
public class UserController : ControllerBase
{
    [HttpGet]
    public IActionResult GetUsers()
    {
        var listUsers = UserFakeDb.Users;
        return Ok(listUsers);
    }
}

