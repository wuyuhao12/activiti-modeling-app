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

import { FormContent } from '../../api/types';

export const createEmptyForm = (id: string, name: string, description?: string): FormContent => ({
    formRepresentation: {
        id,
        name,
        description,
        version: 0,
        lastUpdatedBy: '',
        lastUpdatedByFullName: '',
        lastUpdated: (new Date).toJSON().slice(0, -1) + '+0000',
        stencilSetId: 0,
        referenceId: null,
        formDefinition: {
            tabs: [],
            fields: [],
            outcomes: [],
            javascriptEvents: [],
            className: '',
            style: '',
            customFieldTemplates: {},
            metadata: {},
            variables: [],
            customFieldsValueInfo: {},
            gridsterForm: false
        }
    },
    processScopeIdentifiers: []
});
