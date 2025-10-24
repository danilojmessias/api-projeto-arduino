/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TestController } from './../controllers/TestController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SceneController } from './../controllers/SceneController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DeviceController } from './../controllers/DeviceController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "TestResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "sceneId": {"dataType":"string","required":true},
            "state": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]}],"required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateTestRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "sceneId": {"dataType":"string","required":true},
            "state": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateMultipleTestsResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "createdTests": {"dataType":"array","array":{"dataType":"refObject","ref":"TestResponse"},"required":true},
            "failedTests": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateMultipleTestsRequest": {
        "dataType": "refObject",
        "properties": {
            "sceneId": {"dataType":"string","required":true},
            "tests": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"state":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]}]},"name":{"dataType":"string","required":true}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StartStopTestResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "sceneId": {"dataType":"string","required":true},
            "state": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]}],"required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SceneResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "deviceId": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateSceneRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "deviceId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateSceneRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "deviceId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeviceResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "ip": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateDeviceRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "ip": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateDeviceRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "ip": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsTestController_getTestsByScene: Record<string, TsoaRoute.ParameterSchema> = {
                sceneId: {"in":"query","name":"sceneId","required":true,"dataType":"string"},
        };
        app.get('/tests',
            ...(fetchMiddlewares<RequestHandler>(TestController)),
            ...(fetchMiddlewares<RequestHandler>(TestController.prototype.getTestsByScene)),

            async function TestController_getTestsByScene(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTestController_getTestsByScene, request, response });

                const controller = new TestController();

              await templateService.apiHandler({
                methodName: 'getTestsByScene',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTestController_createTest: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateTestRequest"},
        };
        app.post('/tests',
            ...(fetchMiddlewares<RequestHandler>(TestController)),
            ...(fetchMiddlewares<RequestHandler>(TestController.prototype.createTest)),

            async function TestController_createTest(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTestController_createTest, request, response });

                const controller = new TestController();

              await templateService.apiHandler({
                methodName: 'createTest',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTestController_createMultipleTests: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateMultipleTestsRequest"},
        };
        app.post('/tests/bulk',
            ...(fetchMiddlewares<RequestHandler>(TestController)),
            ...(fetchMiddlewares<RequestHandler>(TestController.prototype.createMultipleTests)),

            async function TestController_createMultipleTests(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTestController_createMultipleTests, request, response });

                const controller = new TestController();

              await templateService.apiHandler({
                methodName: 'createMultipleTests',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTestController_startStopTest: Record<string, TsoaRoute.ParameterSchema> = {
                testId: {"in":"path","name":"testId","required":true,"dataType":"string"},
        };
        app.put('/tests/:testId/start-stop',
            ...(fetchMiddlewares<RequestHandler>(TestController)),
            ...(fetchMiddlewares<RequestHandler>(TestController.prototype.startStopTest)),

            async function TestController_startStopTest(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTestController_startStopTest, request, response });

                const controller = new TestController();

              await templateService.apiHandler({
                methodName: 'startStopTest',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTestController_getTestById: Record<string, TsoaRoute.ParameterSchema> = {
                testId: {"in":"path","name":"testId","required":true,"dataType":"string"},
        };
        app.get('/tests/:testId',
            ...(fetchMiddlewares<RequestHandler>(TestController)),
            ...(fetchMiddlewares<RequestHandler>(TestController.prototype.getTestById)),

            async function TestController_getTestById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTestController_getTestById, request, response });

                const controller = new TestController();

              await templateService.apiHandler({
                methodName: 'getTestById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSceneController_getScenesByDevice: Record<string, TsoaRoute.ParameterSchema> = {
                deviceId: {"in":"query","name":"deviceId","required":true,"dataType":"string"},
        };
        app.get('/scenes',
            ...(fetchMiddlewares<RequestHandler>(SceneController)),
            ...(fetchMiddlewares<RequestHandler>(SceneController.prototype.getScenesByDevice)),

            async function SceneController_getScenesByDevice(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSceneController_getScenesByDevice, request, response });

                const controller = new SceneController();

              await templateService.apiHandler({
                methodName: 'getScenesByDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSceneController_createScene: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateSceneRequest"},
        };
        app.post('/scenes',
            ...(fetchMiddlewares<RequestHandler>(SceneController)),
            ...(fetchMiddlewares<RequestHandler>(SceneController.prototype.createScene)),

            async function SceneController_createScene(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSceneController_createScene, request, response });

                const controller = new SceneController();

              await templateService.apiHandler({
                methodName: 'createScene',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSceneController_updateScene: Record<string, TsoaRoute.ParameterSchema> = {
                sceneId: {"in":"path","name":"sceneId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UpdateSceneRequest"},
        };
        app.put('/scenes/:sceneId',
            ...(fetchMiddlewares<RequestHandler>(SceneController)),
            ...(fetchMiddlewares<RequestHandler>(SceneController.prototype.updateScene)),

            async function SceneController_updateScene(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSceneController_updateScene, request, response });

                const controller = new SceneController();

              await templateService.apiHandler({
                methodName: 'updateScene',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSceneController_deleteScene: Record<string, TsoaRoute.ParameterSchema> = {
                sceneId: {"in":"path","name":"sceneId","required":true,"dataType":"string"},
        };
        app.delete('/scenes/:sceneId',
            ...(fetchMiddlewares<RequestHandler>(SceneController)),
            ...(fetchMiddlewares<RequestHandler>(SceneController.prototype.deleteScene)),

            async function SceneController_deleteScene(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSceneController_deleteScene, request, response });

                const controller = new SceneController();

              await templateService.apiHandler({
                methodName: 'deleteScene',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDeviceController_getDevices: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/devices',
            ...(fetchMiddlewares<RequestHandler>(DeviceController)),
            ...(fetchMiddlewares<RequestHandler>(DeviceController.prototype.getDevices)),

            async function DeviceController_getDevices(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDeviceController_getDevices, request, response });

                const controller = new DeviceController();

              await templateService.apiHandler({
                methodName: 'getDevices',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDeviceController_createDevice: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateDeviceRequest"},
        };
        app.post('/devices',
            ...(fetchMiddlewares<RequestHandler>(DeviceController)),
            ...(fetchMiddlewares<RequestHandler>(DeviceController.prototype.createDevice)),

            async function DeviceController_createDevice(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDeviceController_createDevice, request, response });

                const controller = new DeviceController();

              await templateService.apiHandler({
                methodName: 'createDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDeviceController_updateDevice: Record<string, TsoaRoute.ParameterSchema> = {
                deviceId: {"in":"path","name":"deviceId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UpdateDeviceRequest"},
        };
        app.put('/devices/:deviceId',
            ...(fetchMiddlewares<RequestHandler>(DeviceController)),
            ...(fetchMiddlewares<RequestHandler>(DeviceController.prototype.updateDevice)),

            async function DeviceController_updateDevice(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDeviceController_updateDevice, request, response });

                const controller = new DeviceController();

              await templateService.apiHandler({
                methodName: 'updateDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDeviceController_deleteDevice: Record<string, TsoaRoute.ParameterSchema> = {
                deviceId: {"in":"path","name":"deviceId","required":true,"dataType":"string"},
        };
        app.delete('/devices/:deviceId',
            ...(fetchMiddlewares<RequestHandler>(DeviceController)),
            ...(fetchMiddlewares<RequestHandler>(DeviceController.prototype.deleteDevice)),

            async function DeviceController_deleteDevice(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDeviceController_deleteDevice, request, response });

                const controller = new DeviceController();

              await templateService.apiHandler({
                methodName: 'deleteDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDeviceController_deleteAllDevices: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.delete('/devices',
            ...(fetchMiddlewares<RequestHandler>(DeviceController)),
            ...(fetchMiddlewares<RequestHandler>(DeviceController.prototype.deleteAllDevices)),

            async function DeviceController_deleteAllDevices(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDeviceController_deleteAllDevices, request, response });

                const controller = new DeviceController();

              await templateService.apiHandler({
                methodName: 'deleteAllDevices',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
