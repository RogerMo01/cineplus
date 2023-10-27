var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<DataContext>();
var app = builder.Build();

string ip_env_var_name = "REACT_APP_NETWORK_IP";
string? ip_env_var = IpFinder.IpFinder.GetIp();
try{
    // Stablish enviroment variable
    Environment.SetEnvironmentVariable(ip_env_var_name, ip_env_var);
}
catch (Exception ex){
    Console.WriteLine($"Error configuring enviroment variable: {ex.Message}");
}
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
