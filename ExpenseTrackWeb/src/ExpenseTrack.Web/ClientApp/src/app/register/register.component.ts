import { Router } from "@angular/router";
import { Component } from "@angular/core";

import { UserService } from "./../_services/user.service";
import { AlertService } from "./../_services/alert.service";
import { User } from "../_models/user.model";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
	model = new User();
	loading = false;

	constructor(
		private userService: UserService,
		private alertService: AlertService,
		private router: Router
	) {}

	register() {
		this.loading = true;
		this.userService.create(this.model).subscribe(
			() => {
				this.alertService.success(
					"Registration of new user was successful!",
					true
				);
				async () => await this.router.navigate(["login"]);
			},
			() => {
				this.alertService.error(
					"Could not register new user! Please verify data."
				);
				this.loading = false;
			}
		);
	}
}
