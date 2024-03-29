using ChatAPI.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
{
    policy.WithOrigins(["http://localhost:4200"]);
    policy.AllowCredentials();
    policy.AllowAnyHeader();
    policy.AllowAnyMethod();
    policy.SetIsOriginAllowed(_ => true);
}));

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        var secretByte = Encoding.UTF8.GetBytes(AuthSettings.JwtSecret);
        var secretKey = new SymmetricSecurityKey(secretByte);

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = secretKey
        };
    });

builder.Services.Configure<JwtSettingsOptions>(
    builder.Configuration.GetRequiredSection(JwtSettingsOptions.SessionName));

builder.Services.AddSingleton(provider =>
    provider.GetRequiredService<IOptions<JwtSettingsOptions>>().Value);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

// app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
