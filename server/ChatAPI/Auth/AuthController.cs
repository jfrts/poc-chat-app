using ChatAPI.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ChatAPI.Auth;

[ApiController, Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly JwtSettingsOptions _jwtSettings;

    public AuthController(JwtSettingsOptions jwtSettingsOptions)
    {
        this._jwtSettings = jwtSettingsOptions;
    }

    [HttpPost]
    public IActionResult Login(AuthLoginRequest request)
    {
        if (!UserFakeDb.users.Any(user => user.Id == request.userId))
        {
            return NotFound("Usuário não encontrado");
        }

        var jwtSecret = this._jwtSettings.Secret;
        var byteSecret = Encoding.UTF8.GetBytes(jwtSecret!).ToArray();

        var secretKey = new SigningCredentials(
            new SymmetricSecurityKey(byteSecret),
            SecurityAlgorithms.HmacSha256
        );

        var userIdClaim = new Claim(
            ClaimTypes.NameIdentifier,
            request.userId.ToString().ToUpperInvariant()
        );

        var securityToken = new JwtSecurityToken(
            signingCredentials: secretKey,
            claims: [userIdClaim]
        );

        var token = new JwtSecurityTokenHandler().WriteToken( securityToken );

        return Ok(new { request.userId, token});
    }
}
