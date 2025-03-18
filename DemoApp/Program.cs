var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseStaticFiles();

app.MapGet("/", () => "Hello World!");

app.MapGet("/cerere", (context) => {
    var content= "<h1>Hello Cerere GET!</h1>";
    string acceptLanguage = context.Request.Headers["Accept-Language"];
    content += $"<p>Accept-Language: {acceptLanguage}</p>";
    if (acceptLanguage.Length>0)
    {
        acceptLanguage=acceptLanguage.Split(",")[0].Split(";")[0];
    }else{
        acceptLanguage="en";
    }
    content += $"<p>Culture: {acceptLanguage}</p>";
    content += $"<p>Date/Time: {DateTime.Now.ToString("dddd, d MMMM yyyy, HH:mm:ss",new System.Globalization.CultureInfo(acceptLanguage))}</p>";
    context.Response.Headers.Append("Content-Type", "text/html");
    return context.Response.WriteAsync(content);
});

app.MapGet("/special", (context) =>
{
    var content = "";
    var contentType="text/html";
    string category = context.Request.Query["category"];
    switch(category){
        case "css":
            content += "h1{color:blue;}";
            contentType="text/css";
            break;
        case "js":
            content += "alert('Hello from JS!');";
            contentType="application/javascript";
            break;
        case "json":
            content += "{\"message\":\"Hello from JSON!\"}";
            contentType="application/json";
            break;
        case "xml":
            content += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
            content += "<message>Hello from XML!</message>";
            contentType="application/xml";
            break;
        default:
            content += "<h1>Hello Test GET!</h1>";
            contentType="text/html";
            break;
    }
    context.Response.Headers.Append("Content-Type", contentType);
    return context.Response.WriteAsync(content);
});

app.MapPost("/cerere", (context) =>
{
    var content = "<h1>Hello Cerere POST!</h1>";
    context.Response.Headers.Append("Content-Type", "text/html");
    context.Response.StatusCode = 201;
    return context.Response.WriteAsync(content);
});

app.MapPut("/cerere", (context) =>
{
    var content = "<h1>Hello Cerere PUT!</h1>";
    context.Response.Headers.Append("Content-Type", "text/html");
    context.Response.StatusCode = 202;
    return context.Response.WriteAsync(content);
});

app.MapDelete("/cerere", (context) =>
{
    context.Response.StatusCode = 204;
    return context.Response.Body.FlushAsync();
});

app.MapPatch("/cerere", (context) =>
{
    var content = "<h1>Hello Cerere PATCH!</h1>"; // status code 200
    context.Response.Headers.Append("Content-Type", "text/html");
    context.Response.StatusCode = 204;
    if(context.Response.StatusCode==204)
    {
        // return no content
        return context.Response.Body.FlushAsync();
    }
    return context.Response.WriteAsync(content);
});

app.MapPost("/register", (context) =>
{
    var content = "<h1>Hello Cerere POST pentru REGISTER!</h1>";
    context.Response.Headers.Append("Content-Type", "text/html");
    context.Response.StatusCode = 201;

 foreach(var item in context.Request.Form){
        content+="<p>Key: " + item.Key + " Value: '" + item.Value + "'</p>";
    }
    
    return context.Response.WriteAsync(content);
});

app.MapGet("/register", (context) =>
{
    var content = "<h1>Hello Cerere GET pentru REGISTER!</h1>";
    context.Response.Headers.Append("Content-Type", "text/html");
    context.Response.StatusCode = 201;

 foreach(var item in context.Request.Query){
        content+="<p>Key: " + item.Key + " Value: '" + item.Value + "'</p>";
    }
    
    return context.Response.WriteAsync(content);
});

app.Run();
