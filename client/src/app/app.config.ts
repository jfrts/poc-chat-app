import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './users/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerProvider,
      multi: true,
      deps: [UserService]
    }
  ]
};

/**
 * Inicializador de aplicativo que tenta sincronizar dados com o armazenamento local.
 * @param userService - O serviço de usuário utilizado para sincronização.
 * @returns Uma função de inicialização do aplicativo.
 */
function appInitializerProvider(userService: UserService) {
  return function () {
    userService.trySyncLocalStorage();
  }
}