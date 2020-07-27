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

import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { hot, getTestScheduler } from 'jasmine-marbles';
import { StorageService, CoreModule, TranslationService, TranslationMock } from '@alfresco/adf-core';
import { provideMockActions } from '@ngrx/effects/testing';
import { AmaTitleService, OpenEntityDialogAction, EntityDialogPayload, CreateProjectAttemptAction, DialogService, EntityDialogComponent } from '@alfresco-dbp/modeling-shared/sdk';
import { TranslateModule } from '@ngx-translate/core';
import { DialogEffects } from './dialog.effects';
import { Store } from '@ngrx/store';
import { AssignmentDialogComponent } from '../../process-editor/components/assignment/assignment-dialog.component';

describe('DialogEffects', () => {
    let effects: DialogEffects;
    let actions$: Observable<any>;
    let dialogService: DialogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CoreModule.forRoot(),
                TranslateModule.forRoot()
            ],
            providers: [
                DialogEffects,
                StorageService,
                DialogService,
                AmaTitleService,
                provideMockActions(() => actions$),
                {
                    provide: TranslationService,
                    useClass: TranslationMock
                },
                {
                    provide: Store,
                    useValue: {
                        select: jest.fn().mockImplementation(selector => of({}))
                    }
                }
            ]
        });

        effects = TestBed.get(DialogEffects);
        dialogService = TestBed.get(DialogService);
    });

    it('should open EntityDialogComponent when OpenEntityDialogAction is dispatched and dialog data is not set', () => {
        spyOn(dialogService, 'openDialog');

        const data: EntityDialogPayload = {
            title: 'mock-title',
            nameField: 'mock-name',
            descriptionField: 'mock-description',
            action: CreateProjectAttemptAction
        };
        const openEntityDialog = new OpenEntityDialogAction(data);
        actions$ = hot('a', { a: openEntityDialog });

        effects.openEntityDialogEffect.subscribe(() => {
        });
        getTestScheduler().flush();

        expect(dialogService.openDialog).toHaveBeenCalledWith(EntityDialogComponent, { data });
    });

    it('should open the dialog provided in dialog data when OpenEntityDialogAction is dispatched and dialog data is set', () => {
        spyOn(dialogService, 'openDialog');

        const data: EntityDialogPayload = {
            title: 'mock-title',
            nameField: 'mock-name',
            descriptionField: 'mock-description',
            action: CreateProjectAttemptAction,
            dialog: AssignmentDialogComponent
        };
        const openEntityDialog = new OpenEntityDialogAction(data);
        actions$ = hot('a', { a: openEntityDialog });

        effects.openEntityDialogEffect.subscribe(() => {
        });
        getTestScheduler().flush();

        expect(dialogService.openDialog).toHaveBeenCalledWith(AssignmentDialogComponent, { data });
    });
});
