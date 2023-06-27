import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "../_services/authentication.service";
import { User } from "../_models/user.model";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
	currentUser: User;

	constructor(
		private authenticationService: AuthenticationService,
		private router: Router
	) {}

	ngOnInit() {
		this.authenticationService.onCurrentUserChange().subscribe((user) => {
			this.currentUser = user;
		});
		this.currentUser = this.authenticationService.currentUser;
	}

	signOut() {
		this.authenticationService.logout();
		this.router.navigate(["login"]);
	}
}
