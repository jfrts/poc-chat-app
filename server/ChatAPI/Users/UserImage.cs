namespace ChatAPI.Users;

public class UserImage(Guid userId, byte[] image)
{
    public Guid UserId { get; private set; } = userId;
    public byte[] Image { get; private set; } = image;

    public void updateImage(byte[] newImage)
    {
        Image = newImage;
    }
}
