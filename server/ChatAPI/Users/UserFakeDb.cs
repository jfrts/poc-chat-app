namespace ChatAPI.Users;

public static class UserFakeDb
{
    public static readonly List<User> Users =
    [
        new User(new Guid("0c768977-439b-4cfe-a9be-dcb93e37642a"), "Emma Ruth", "user1.png"),
        new User(new Guid("4b880827-c251-458f-bbb0-45bbd9c986b2"), "Trent Alexis", "user2.png"),
        new User(new Guid("f7a9e1db-4dab-4fb5-a3a2-80fb110863b2"), "Laura Enyonam", "user3.png")
    ];
}
