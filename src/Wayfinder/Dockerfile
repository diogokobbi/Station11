FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

EXPOSE 80
EXPOSE 443
ENV ASPNETCORE_URLS=http://+:80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["./Application/Application.csproj", "src/Application/"]
COPY ["./Domain/Domain.csproj", "src/Domain/"]
COPY ["./API/API.csproj", "src/API/"]

RUN dotnet restore "src/API/API.csproj"

COPY . .

WORKDIR "/src/API/"
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS runtime
WORKDIR /app

COPY --from=publish /app/publish .
RUN ls -l
ENTRYPOINT [ "dotnet", "API.dll" ]