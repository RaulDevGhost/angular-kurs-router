import { Component } from "@angular/core";
import { AllUsers, Profile } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { StoreService } from "src/app/services/store.service";
import { UsersService } from "src/app/services/users.service";
import { FilesService } from "../../services/files.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
  constructor(
    private usersService: UsersService,
    private storeService: StoreService,
    private authService: AuthService,
    private filesService: FilesService
  ) {}

  users: AllUsers[] = [];
  accessToke = "";
  profile: Profile = {
    id: "",
    name: "",
    email: "",
  };
  imgRta = "";

  getAllUers() {
    this.usersService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  getProfile() {
    // this.storeService.getToken$.subscribe((res) => {
    //   this.accessToke = res;
    // });
    this.authService.getProfile().subscribe((res) => {
      console.log("get profile-->", res);
      this.profile = res;
    });
  }

  onLoad(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file).subscribe((rta) => {
        console.log(rta);
        this.imgRta = rta.location;
      });
    }
  }
}
