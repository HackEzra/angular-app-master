import { AuthServiceConfig, GoogleLoginProvider } from "angularx-social-login";

let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("341004786579-f3655tfhkcq4ft813rjs3gh1ganmb36n.apps.googleusercontent.com")
        //624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com

        //341004786579-f3655tfhkcq4ft813rjs3gh1ganmb36n.apps.googleusercontent.com
    }
]);

export function provideConfig() {
    return config;
}