export class Endpoints {
    private static get root () { return 'https://api.angular-email.com/' }

    static get signup() { return this.root + 'auth/signup' }
    static get signin() { return this.root + 'auth/signin' }
    static get signout() { return this.root + 'auth/signout' }
    static get checkUsername() { return this.root + 'auth/username' }
    static get checkSigned () { return this.root + 'auth/signedin' }

    static get emails () { return this.root + 'emails' }

}
