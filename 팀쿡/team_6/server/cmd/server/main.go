package main

import "starrynight.com/server/internal/interface/rest"

// @title           Starry Night API
// @version         1.0.0
// @description     Starry Night API
// @termsOfService  http://swagger.io/terms/

// @Schemes   https
// @host      api-starrynight.luidium.com
// @BasePath  /

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and Session Token.
func main() {
	rest.Run()
}
