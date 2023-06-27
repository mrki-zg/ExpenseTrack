import { TestBed, async, inject } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AlertService } from "./alert.service";
import { AlertType } from "../alert/_enums/alert.enum";

describe("Service: Alert", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [AlertService]
		});
	});

	it("should transfer message test", inject(
		[AlertService],
		(service: AlertService) => {
			service.onMessage().subscribe((evt) => {
				expect(evt.type).toBe(AlertType.success);
				expect(evt.message).toBe("test");
			});

			service.success("test", false);
		}
	));
});
