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

import { VariableMappingBehavior } from '../interfaces/variable-mapping-type.interface';

export type PROJECT_TYPE = 'project';
export type CUSTOM_MODEL_TYPE = 'model';
export type PROCESS_TYPE = 'process';
export type FORM_TYPE = 'form';
export type CONNECTOR_TYPE = 'connector';
export type DATA_TYPE = 'data';
export type DECISION_TABLE_TYPE = 'decision';
export type UI_TYPE = 'ui';
export type FILE_TYPE = 'file';
export type SCRIPT_TYPE = 'script';
export type TRIGGER_TYPE = 'trigger';
export type FORM_WIDGET_TYPE = 'custom-form-widget';
export type MODEL_TYPE = PROCESS_TYPE | FORM_TYPE | CONNECTOR_TYPE | DATA_TYPE | DECISION_TABLE_TYPE | UI_TYPE | FILE_TYPE | SCRIPT_TYPE | TRIGGER_TYPE | CUSTOM_MODEL_TYPE
    | FORM_WIDGET_TYPE;

export const PROJECT: PROJECT_TYPE = 'project';
export const CUSTOM_MODEL: CUSTOM_MODEL_TYPE = 'model';
export const PROCESS: PROCESS_TYPE = 'process';
export const FORM: FORM_TYPE = 'form';
export const CONNECTOR: CONNECTOR_TYPE = 'connector';
export const DATA: DATA_TYPE = 'data';
export const DECISION_TABLE: DECISION_TABLE_TYPE = 'decision';
export const UI: UI_TYPE = 'ui';
export const FILE: FILE_TYPE = 'file';
export const SCRIPT: SCRIPT_TYPE = 'script';
export const TRIGGER: TRIGGER_TYPE = 'trigger';
export const FORM_WIDGET: FORM_WIDGET_TYPE = 'custom-form-widget';

export interface Project {
    type: PROJECT_TYPE;
    id: string;
    name: string;
    creationDate: Date;
    createdBy: string;
    lastModifiedDate: Date;
    lastModifiedBy: string;
    description: string;
    version: string;
}

export type CustomModelStatus = 'ACTIVE' | 'DRAFT';
export const ACTIVE_STATUS: CustomModelStatus = 'ACTIVE';
export const INACTIVE_STATUS: CustomModelStatus = 'DRAFT';

export interface CustomTypePayload {
    name: string;
    parentName: string;
    title: string;
    description?: string;
}

export interface CustomAspectPayload {
    name: string;
    parentName: string;
    title: string;
    description?: string;
}

export interface ApiError {
    errorKey?: string;
    statusCode: number;
    briefSummary: string;
    stackTrace: string;
    descriptionURL: string;
    logId?: string;
}

export interface ApiErrorResponse {
    error: ApiError;
}

export interface ReleaseEntry {
    entry: Release;
}

export interface CollaboratorEntry {
    entry: Collaborator;
}

export interface Release {
    id: string;
    name: string;
    creationDate: Date;
    createdBy: string;
    lastModifiedDate: Date;
    lastModifiedBy: string;
    version?: string;
    projectName?: string;
}

export interface Collaborator {
    createdBy: string;
    id: string;
    projectId: string;
    username: string;
}

export interface MinimalModelSummary {
    name: string;
    description?: string;
}

export interface Model extends MinimalModelSummary {
    id: string;
    description: string;
    version: string;
    applicationId?: string; // To remove, since BE finally returns it
    type: string;
    creationDate: Date;
    createdBy: string;
    lastModifiedDate: Date;
    lastModifiedBy: string;
    projectIds: string[];
    scope: ModelScope;
}

export enum ModelScope {
    PROJECT = 'PROJECT',
    GLOBAL = 'GLOBAL'
}

export interface Filter extends Model {
    icon?: string;
}

export interface Process extends Model {
    type: PROCESS_TYPE;
    extensions?: ModelExtensions;
}

export type ProcessVariableId = string;

export enum MappingType {
    variable = 'variable',
    value = 'value',
    static = 'static_value'
}

export interface ServiceParameterMapping {
    [name: string]: {
        type: MappingType,
        value: any;
    };
}

export interface ServiceParameterMappings {
    inputs?: ServiceParameterMapping;
    outputs?: ServiceParameterMapping;
    mappingType?: VariableMappingBehavior;
}

export interface ServicesParameterMappings {
    [serviceTaskId: string]: ServiceParameterMappings;
}

export interface ServicesConstants {
    [serviceTaskId: string]: ServicesParameterConstants;
}

export interface ServicesParameterConstants {
    [type: string]: {
        value: string;
    };
}

export enum AssignmentMode {
    candidates = 'candidates',
    assignee = 'assignee'
}

export enum AssignmentType {
    static = 'static',
    identity = 'identity',
    expression = 'expression'
}

export interface TaskAssignment {
    id: string;
    type: AssignmentType;
    assignment: AssignmentMode;
}

export interface TaskAssignmentContent {
    [serviceTaskId: string]: TaskAssignment;
}

export interface ProcessExtensionsContent {
    properties: EntityProperties;
    mappings: ServicesParameterMappings;
    constants: ServicesConstants;
    assignments?: TaskAssignmentContent;
}

export interface ProcessExtensions {
    id: string;
    extensions: ProcessExtensionsContent;
}

export interface ModelExtensions {
    [processID: string]: ProcessExtensionsContent;
}

export interface EntityProperty {
    id: string;
    name: string;
    label?: string;
    type: string;
    required?: boolean;
    value: string;
}

export interface EntityProperties {
    [propertiesId: string]: EntityProperty;
}

export type ProcessContent = string;

export interface Connector extends Model {
    type: CONNECTOR_TYPE;
    template?: string;
}

export interface ConnectorConfigParameter {
    name: string;
    description?: string;
    required?: boolean;
    secure?: boolean;
    value: string;
}

export interface ConnectorError {
    name: string;
    description?: string;
    code?: string;
}

export interface ConnectorParameter {
    id: string;
    name: string;
    label?: string;
    description?: string;
    type: string;
    mappingValueType?: string;
    required?: boolean;
    readOnly?: boolean;
    value?: any;
}
export interface ConnectorContent {
    name: string;
    description?: string;
    actions?: ConnectorFeatureData;
    events?: ConnectorFeatureData;
    config?: ConnectorConfigParameter[];
    errors?: ConnectorError[];
    template?: string;
}

export interface ConnectorFeatureData {
    [actionId: string]: ConnectorFeature;
}

export interface ConnectorFeature {
    id: string;
    name: string;
    description?: string;
    inputs?: ConnectorParameter[];
    outputs?: ConnectorParameter[];
}

export interface Form extends Model {
    type: FORM_TYPE;
}

export interface FormContent {
    formRepresentation: FormRepresentation;
}

export interface FormRepresentation {
    id: string;
    name: string;
    description: string;
    version?: number;
    formDefinition?: FormDefinition;
    standAlone?: boolean;
    contentForm?: boolean;
    contentType?: string;
    updateMetadataOnSubmit?: boolean;
}

export interface FormTab {
    id: string;
    title: string;
    visibilityCondition: any;
}

export interface FormOutcome {
    id: string;
    name: string;
}

export interface FormDefinition {
    tabs: FormTab[];
    fields: any[];
    outcomes: FormOutcome[];
    metadata: {};
    variables: EntityProperties[];
}

export interface UiPlugin {
    name: string;
    version: string;
    order: string;
}

export interface UiContent {
    id: string;
    name: string;
    description?: string;
    'adf-template': string;
    plugins: UiPlugin[];
    configs?: any;
}

export interface Ui extends Model {
    type: UI_TYPE;
}

export interface DataContent {
    id: string;
    name: string;
    description?: string;
}

export type DecisionTableContent = string;

export interface Data extends Model {
    type: DATA_TYPE;
}

export interface DecisionTable extends Model {
    type: DECISION_TABLE_TYPE;
}

export interface Pagination {
    count: number;
    hasMoreItems: boolean;
    maxItems: number;
    skipCount: number;
    totalItems: number;
}

export interface ServerSideSorting {
    key: string;
    direction: string;
}

export interface SearchQuery {
    key: string;
    value: string;
}

export interface FetchQueries {
    skipCount?: number;
    maxItems?: number;
}

export interface ErrorResponse {
    status: number;
    message: string;
}

export interface FileModel {
    content: ActivitiFileContent;
    model: ActivitiFile;
}

export type ActivitiFileContent = File;

export interface ActivitiFile extends Model {
    type: FILE_TYPE;
    extensions: FileExtensions;
}

export interface FileExtensions {
    id: string;
    uri: string;
    name?: string;
    content?: FileExtensionsContent;
    createdAt?: Date;
}

export interface FileExtensionsContent {
    mimeType?: string;
    mimeTypeName?: string;
    sizeInBytes?: number;
    encoding?: string;
}

export interface ScriptModel {
    content: ActivitiScriptContent;
    model: ActivitiScript;
}

export type ActivitiScriptContent = string;

export interface ActivitiScript extends Model {
    type: SCRIPT_TYPE;
    extensions: ScriptExtensions;
}

export interface ScriptExtensions {
    uri: string;
    name?: string;
    content?: ScriptExtensionsContent;
    createdAt?: Date;
    language: string;
    variables?: EntityProperty[];

}

export interface ScriptExtensionsContent {
    mimeType?: string;
    mimeTypeName?: string;
    sizeInBytes?: number;
    encoding?: string;
}
export interface MessagePayload {
    type: string;
    value: string | number | null;
    name: string;
}

export interface TriggerEvent {
    source: string;
    inputs: any;
}

export interface TriggerAction {
    source: string;
    payload: any;
}

export interface TriggerContent {
    id: string;
    name: string;
    description?: string;
    event?: TriggerEvent;
    action?: TriggerAction;
}

export interface Trigger extends Model {
    type: TRIGGER_TYPE;
}

export interface ContentModel extends Model {
    type: CUSTOM_MODEL_TYPE;
}

export type ContentModelXML = string;

export interface ProcessDropdownStructure {
    [processName: string]: ProcessInfo[];
}

export interface ProcessInfo {
    processName: string;
    processDefinitionId: string;
    processProperties: EntityProperty[];
}

export interface WidgetContent {
    id?: string;
    name: string;
    description: string;
    type: string;
    isCustomType: boolean;
    valueType: string;
    className: string;
    icon?: string;
}

export interface Widget extends Model {
    type: FORM_WIDGET_TYPE;
    extensions: WidgetContent;
}
