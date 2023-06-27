import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthenticationService } from "./../_services/authentication.service";
import { AlertService } from "./../_services/alert.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
	private returnUrl: string;

	loading = false;
	model: any = {};

	constructor(
		private authenticationService: AuthenticationService,
		private alertService: AlertService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.authenticationService.logout();
		this.returnUrl =
			this.activatedRoute.snapshot.queryParams["returnUrl"] || "/";
	}

	login() {
		this.loading = true;
		this.authenticationService
			.login(this.model.userName, this.model.password)
			.subscribe(
				() => this.router.navigate([this.returnUrl]),
				() => {
					this.alertService.error(
						"Login failed! Please check user name and password."
					);
					this.loading = false;
				}
			);
	}
}
