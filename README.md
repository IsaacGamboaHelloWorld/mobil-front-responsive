# Web responsive construida en Vue 3

Este proyeto fue creado en Vue @3.2.41, utiliza el sistema de gestión de paquetes npm (version 8.19.2) para node v18.16.0. La herramienta que nos ayuda a hacer la compilación es Vite @4.3.5

##### Repositorios Requeridos

- Clonar repositorio principal del front responsive - `git clone git@git.solem.cl:mobile/icbs-mobil-front-responsive.git`

- Clonar repsositorio de material estatico - `git clone git@git.solem.cl:mobile/icbs-mobil-front-commons.git` el material estatico actualizado se encuentra en la rama main. Asi mismo, este repositorio debe ir clonado dentro de la carpeta src generada en el repositorio principal

#### Dependencias para Produccion

- tanstack/vue-query (V4.20.5) - [tanstack](https://tanstack.com/query/v4/docs/vue/installation)

- Vuelidate (V2.0.0) - [Vuelidate installation ](https://vuelidate-next.netlify.app/#installation) Dependencia que nos ayuda a validar fomurlarios y manejo de estos mismos.

- Axios (V1.2.1) - [Axios installation] (https://axios-http.com/docs/intro)

- Jsencrypt (V3.3.1) - [jsencrypt installation](https://www.npmjs.com/package/jsencrypt) Modulo que hace la encriptacion RSA en base 64 de campos sensibles en el web responsivo

- Pinia (V2.0.23) - [Pinia installation] (https://pinia.vuejs.org/getting-started.html) Store oficial para Vue 3

- Vue Router 4 (V4.1.6) - [vue-router installation](https://router.vuejs.org/installation.html) Enrutador oficial de Vue 3

- Vue lottie (V2.5.0) - [vue3-lottie installation](https://vue3-lottie.vercel.app/guide.html#vue-3) Modulo oficial de VUe 3 para agregar animaciones de Lottie a sus aplicaciones

#### Dependencias de desarrollo

Estas son necesarias para algunos comandos necesarios al momento de hacer el pipeline

- Prettier (V2.7.1) - [prettier installation](https://prettier.io/docs/en/install.html)

- Eslint (8.28.0) - ES neceario tener eslint[] y eslint vue compatibility[eslin intallation for Vue](https://eslint.vuejs.org/user-guide/) y las reglas estandar [installation](https://www.npmjs.com/package/@vue/eslint-config-prettier) reglas para typescript [installation](https://www.npmjs.com/package/@vue/eslint-config-typescript)

- Vite (V4.3.5) - [vite](https://vitejs.dev/guide/)

- vite/plugin-vue (V4.2.2) - [oficial plugins for Vite](https://vitejs.dev/plugins/) Es necesario para la compatibiliad con Vue y configuraciones de compilacion

#### Generar Artefacto y Compilacion

Para la compilacion o comando de construccion de los diferentes modos en el proyecto se sigue la siguiente estructura:

`npm run build-{ambiente}-{banco}`
Los valores posibles para banco son: bpop,bavv,bocc y bbog.

Los diferentes ambientes con su codigo correspondiente para el comando anterior son:

- **Ambiente G3 :** g3
- **Ambiente G2 :** g2
- **Ambiente QA de Ginko :** qaGinko
- **Ambiente QA de ATH :** qa
- **Ambiente Produccion:** prod
- **Local:** no se requiere codigo

Algunos ejemplos:

- artefacto para Banco Popular apuntando al ambiente de qa ATH: `npm run build-qa-bpop`
- artefacto para Banco del Occidente apuntando a ambiente G3 de ATH: `npm run build-g3-bocc`

5. podra observar una carpeta 'dist' en la raiz del proyecto donde estara el artefacto ta construido

#### Pruebas unitarias y coverage

test unitarias - `npm run test:unit `

coverage - ``npm run coverage`

#### eslint y prettier

eslint - `npm run lint`
eslint - `npm run prettier`
