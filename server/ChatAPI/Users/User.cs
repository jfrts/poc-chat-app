namespace ChatAPI.Users;

public class User(Guid id, string name, string profilePicture)
{
    public Guid Id { get; private set; } = id;
    public string Name { get; private set; } = name;
    public string ProfilePicture { get; private set; } = profilePicture;
}
