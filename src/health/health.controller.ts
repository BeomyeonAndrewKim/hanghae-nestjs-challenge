import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'Hanghae99',
          'https://hanghae99.spartacodingclub.kr/',
        ),
      () =>
        this.http.pingCheck('Adriel business page', 'https://www.adriel.com/'),
      () => this.http.pingCheck('Adriel BI', 'https://app.adriel.com'),
      () => this.http.pingCheck('Adgen AI', 'https://app.adgenai.com'),
    ]);
  }
}
