import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-icons",
  templateUrl: "./icons.component.html",
  styleUrls: ["./icons.component.scss"],
})
export class IconsComponent implements OnInit {
  @Input() type: "info" | "success" | "warning" | "error" | "normal" = "error";

  constructor() {}

  ngOnInit(): void {}
}
