using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace ChatAPI.Users;

[ApiController, Route("api/users")]
public class UserController : ControllerBase
{
    [HttpGet]
    public IActionResult GetUsers()
    {
        var listUsers = UserFakeDb.users;
        return Ok(listUsers);
    }

    [HttpPut("{userId}/image")]
    public async Task<IActionResult> UpdateUserImage(Guid userId, [FromForm] IFormFile image)
    {
        try
        {
            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);
                var existingUserImage = UserFakeDb.userImages.FirstOrDefault(userImage => userImage.UserId == userId);

                if (existingUserImage is null)
                {
                    UserFakeDb.userImages.Add(new UserImage(userId, memoryStream.ToArray()));
                }
                else
                {
                    existingUserImage.updateImage(memoryStream.ToArray());
                }
            }
            return Ok();
        } catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }

    [HttpGet("{userId}/image")]
    public IActionResult getUserImage(Guid userId)
    {
        var userImage = UserFakeDb.userImages.FirstOrDefault(image => image.UserId == userId);
        
        if (userImage is null)
        {
            return NotFound();
        }

        return File(userImage.Image, MediaTypeNames.Image.Jpeg);
    }
}
