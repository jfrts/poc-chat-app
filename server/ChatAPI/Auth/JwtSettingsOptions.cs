namespace ChatAPI.Auth;

public class JwtSettingsOptions
{
    public static string SessionName = "JwtSettings";
    public string Secret { get; set; } = "";
}
