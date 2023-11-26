using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Configuracion de la autenticacion basada en JWT
var _authkey = builder.Configuration.GetValue<string>("JwtSettings:securitykey");
builder.Services.AddAuthentication(item =>
{
    item.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    item.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(item =>
{
    item.RequireHttpsMetadata = true;
    item.SaveToken = true;
    item.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authkey)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddDbContext<DataContext>();


var mappingConfig = new MapperConfiguration(cfg =>
{
    cfg.AddProfile<MappingRoom>();
    cfg.AddProfile<MappingActor>();
    cfg.AddProfile<MappingGenre>();
    cfg.AddProfile<MappingMovieProgramming>();
    cfg.AddProfile<MappingDiscount>();
    cfg.AddProfile<MappingMovie>();
    cfg.AddProfile<MappingCriterion>();
    cfg.AddProfile<MappingSale>();
});

var mapper = mappingConfig.CreateMapper();
builder.Services.AddSingleton(mapper);


//  builder.Services.AddAutoMapper(typeof(Program));    

// Clave secreta JwtToken
var _jwtsettings = builder.Configuration.GetSection("JwtSettings");
builder.Services.Configure<JwtSettings>(_jwtsettings);

var app = builder.Build();

string ip_env_var_name = "REACT_APP_NETWORK_IP";
string? ip_env_var = IpFinder.IpFinder.GetIp();
try
{
    // Stablish enviroment variable
    Environment.SetEnvironmentVariable(ip_env_var_name, ip_env_var);
}
catch (Exception ex)
{
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

app.UseAuthentication();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
