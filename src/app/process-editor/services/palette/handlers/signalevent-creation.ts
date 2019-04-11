 /*!
 * @license
 * Copyright 2019 Alfresco, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable, Inject } from '@angular/core';
import { BpmnElementTrigger, TiggerHandler, ProcessModelerServiceToken, ProcessModelerService } from 'ama-sdk';

@Injectable()
export class SignalEventCreationHandler implements TiggerHandler {

    constructor(
        @Inject(ProcessModelerServiceToken) private processModelerService: ProcessModelerService
    ) {}

    private get create() {
        return this.processModelerService.getFromModeler('create');
    }

    private get elementFactory() {
        return this.processModelerService.getFromModeler('elementFactory');
    }

    private get bpmnFactory() {
        return this.processModelerService.getFromModeler('bpmnFactory');
    }

    processEvent(event: any, element: BpmnElementTrigger) {
        const shape = this.elementFactory.createShape({ type: element.type });
        shape.businessObject.eventDefinitions = [ this.createDefinitionAndItsSignal() ];

        this.create.start(event, shape);
    }

    private createDefinitionAndItsSignal() {
        const signalElement = this.bpmnFactory.create('bpmn:Signal');
        signalElement.name = signalElement.id;
        this.processModelerService.getRootProcessElement().businessObject.$parent.rootElements.push(signalElement);

        const signalDefinition = this.bpmnFactory.create('bpmn:SignalEventDefinition');
        signalDefinition.$attrs.signalRef = signalElement.id;

        return signalDefinition;
    }
}