import { UnauthorizedException } from "@nestjs/common";

export class SessionUnauthorizedException extends UnauthorizedException {
  constructor() {
    super("Вход не выполнен");
  }
}