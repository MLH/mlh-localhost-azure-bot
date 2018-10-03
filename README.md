# MLHacks (Azure QnA bot + NodeJS)

This app demonstrates setting up a simple NodeJS app that connects to the QnA bot service on Azure. It makes the request by using a jQuery wrapper to an internal NodeJS endpoint that wraps the call to Azure. 

## Configuration
Aspects of the app are controlled by the following environment variable. Feel free to modify them once deployed or before running locally.

| Name  | Description  | Default  |
|---|---|---|
|  PORT | The port to run the webserver on | 3000  |
|  ENDPOINT |  The QnA bot endpoint URI |  undefined |
|  ENDPOINT_KEY | The EndpointKey to use with the specified ENDPOINT | undefined |


## Running locally
To run the app locally, simply run:
`yarn` to install the dependencies of the app and then `npm start` or `yarn start`

## Setting up the QnA bot
You must create a QnA bot by visiting Azure's [QnAMaker](https://www.qnamaker.ai/Create). Then, click My knowledge bases, click your knowledge base, click settings, and under the "Deployment details, note the EndpointKey (e.g bc2381b2-8231-3g89-t421-2c3d7f90ebcc), and the host + path by using the first two lines (e.g: https://yourknowledgebase.azurewebsites.net/qnamaker/knowledgebases/somecode)

### Deploying application
1. On the left hand toolbar, click "Create a resource"
2. Search for "Web App" and hit enter. Note: Do not select the ones that come with a database like PostgreSQL.
3. Type in a name for the application, choose a subscription, select Linux as the OS, choose "Code" as the publish method, choose a service plan, and select Node 10.1 as the Runtime stack (or any Node 10.x variant available). You can disable Application Insights for the purpose of the demo application.
4. Click create, and wait for your application to get deployed.
5. Go to the application you just created, and click deployment options. Choose GitHub as the source (set up your account as needed), and choose "Personal" as the organization, choose "mlh-localhost-faq-bot" as the project, and choose "master" as the branch. Click OK.
6. Finally, goto the Application settings,  and create a new App Setting with the name "ENDPOINT" and the value as this string with the values you noted above and ENDPOINT_KEY with the value you noted above for EndpointKey.
7. Go to overview and restart the application. After you restart the application, you can visit it by clicking the link under "URL". 
