/*******************************************************************************
 *  Code contributed to the webinos project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright 2013 Torsec -Computer and network security group-
 * Politecnico di Torino
 *
 ******************************************************************************/

var fs = require('fs');
var path = require('path');
var m2p = require (path.join(__dirname,
                             '../../lib/manifest2policy/manifest2policy.js'));

var manifest1 = 'manifestExample1.xml';
var manifest2 = 'manifestExample2.xml';
var outputFile = 'outputFile.xml';
var optionalFeature = ['http://webinos.org/api/webnotification'];

describe("Manager.WidgetManager.manifest2policy", function() {

    it("Wrong parameters, no policy generated", function() {
        runs(function() {
            expect(m2p.manifest2policy()).toEqual(false);
        });

        runs(function() {
            expect(m2p.manifest2policy(manifest1)).toEqual(false);
        });
    });

    it("Optional features allowed", function() {
        if (fs.existsSync(outputFile)) {
            fs.unlinkSync(outputFile);
        }
        runs(function() {
            expect(m2p.manifest2policy(manifest1, outputFile, optionalFeature))
                .toEqual(true);
            var data = fs.readFileSync(outputFile, 'utf-8');
            data = data.replace(/\r/g, '');
            data = data.replace(/\n/g, '');
            expect(data).toEqual('<policy-set><policy><target><subject><subject-match attr="id" match="John Lyle-Proximity Reminders"></subject-match></subject></target><rule effect="permit"><condition combine="or"><resource-match attr="api-feature" match="http://webinos.org/feature/internet"></resource-match><resource-match attr="api-feature" match="http://webinos.org/api/webnotification"></resource-match><resource-match attr="api-feature" match="http://webinos.org/api/file"></resource-match><resource-match attr="api-feature" match="http://www.w3.org/ns/api-perms/geolocation"></resource-match></condition></rule><rule effect="deny"></rule><DataHandlingPreferences PolicyId="#current-John Lyle-Proximity Reminders"><AuthorizationsSet><AuthzUseForPurpose><Purpose>http://www.w3.org/2002/01/P3Pv1/current</Purpose></AuthzUseForPurpose></AuthorizationsSet><ObligationsSet></ObligationsSet></DataHandlingPreferences><ProvisionalActions><ProvisionalAction><AttributeValue>http://webinos.org/geolocation</AttributeValue><AttributeValue>#current-John Lyle-Proximity Reminders</AttributeValue><DeveloperProvidedDescription language="EN">         Geolocation is needed to trigger reminders based on your current          location.       </DeveloperProvidedDescription></ProvisionalAction><ProvisionalAction><AttributeValue>http://webinos.org/api/webnotification</AttributeValue><AttributeValue>#current-John Lyle-Proximity Reminders</AttributeValue><DeveloperProvidedDescription language="EN">         Notifications are used to alert you when a reminder is valid -          e.g., at a specific time or place.       </DeveloperProvidedDescription></ProvisionalAction><ProvisionalAction><AttributeValue>http://webinos.org/api/file</AttributeValue><AttributeValue>#current-John Lyle-Proximity Reminders</AttributeValue><DeveloperProvidedDescription language="EN">         Your reminders are stored in files on the file system       </DeveloperProvidedDescription></ProvisionalAction><ProvisionalAction><AttributeValue>http://webinos.org/feature/internet</AttributeValue><AttributeValue>#current-John Lyle-Proximity Reminders</AttributeValue><DeveloperProvidedDescription language="EN">         Internet access is used to load Google Maps       </DeveloperProvidedDescription></ProvisionalAction></ProvisionalActions></policy></policy-set>');
		});
	});

    it("Optional features denied", function() {
        if (fs.existsSync(outputFile)) {
            fs.unlinkSync(outputFile);
        }
        runs(function() {
            expect(m2p.manifest2policy(manifest1, outputFile, ''))
                .toEqual(true);
            var data = fs.readFileSync(outputFile, 'utf-8');
            data = data.replace(/\r/g, '');
            data = data.replace(/\n/g, '');
            expect(data).toEqual('<policy-set><policy><target><subject><subject-match attr="id" match="John Lyle-Proximity Reminders"></subject-match></subject></target><rule effect="permit"><condition combine="or"><resource-match attr="api-feature" match="http://webinos.org/feature/internet"></resource-match><resource-match attr="api-feature" match="http://webinos.org/api/file"></resource-match><resource-match attr="api-feature" match="http://www.w3.org/ns/api-perms/geolocation"></resource-match></condition></rule><rule effect="deny"></rule><DataHandlingPreferences PolicyId="#current-John Lyle-Proximity Reminders"><AuthorizationsSet><AuthzUseForPurpose><Purpose>http://www.w3.org/2002/01/P3Pv1/current</Purpose></AuthzUseForPurpose></AuthorizationsSet><ObligationsSet></ObligationsSet></DataHandlingPreferences><ProvisionalActions><ProvisionalAction><AttributeValue>http://webinos.org/geolocation</AttributeValue><AttributeValue>#current-John Lyle-Proximity Reminders</AttributeValue><DeveloperProvidedDescription language="EN">         Geolocation is needed to trigger reminders based on your current          location.       </DeveloperProvidedDescription></ProvisionalAction><ProvisionalAction><AttributeValue>http://webinos.org/api/webnotification</AttributeValue><AttributeValue>#current-John Lyle-Proximity Reminders</AttributeValue><DeveloperProvidedDescription language="EN">         Notifications are used to alert you when a reminder is valid -          e.g., at a specific time or place.       </DeveloperProvidedDescription></ProvisionalAction><ProvisionalAction><AttributeValue>http://webinos.org/api/file</AttributeValue><AttributeValue>#current-John Lyle-Proximity Reminders</AttributeValue><DeveloperProvidedDescription language="EN">         Your reminders are stored in files on the file system       </DeveloperProvidedDescription></ProvisionalAction><ProvisionalAction><AttributeValue>http://webinos.org/feature/internet</AttributeValue><AttributeValue>#current-John Lyle-Proximity Reminders</AttributeValue><DeveloperProvidedDescription language="EN">         Internet access is used to load Google Maps       </DeveloperProvidedDescription></ProvisionalAction></ProvisionalActions></policy></policy-set>');
        });
    });

    it("Add a new policy", function() {
        runs(function() {
            expect(m2p.manifest2policy(manifest2, outputFile, optionalFeature))
                .toEqual(true);
            var data = fs.readFileSync(outputFile, 'utf-8');
            data = data.replace(/\r/g, '');
            data = data.replace(/\n/g, '');
            expect(data).toEqual('<policy-set><policy><target><subject><subject-match attr="id" match="John Lyle-Another Example"></subject-match></subject></target><rule effect="permit"><condition combine="or"><resource-match attr="api-feature" match="http://webinos.org/feature/internet"></resource-match><resource-match attr="api-feature" match="http://webinos.org/api/webnotification"></resource-match><resource-match attr="api-feature" match="http://webinos.org/api/file"></resource-match><resource-match attr="api-feature" match="http://www.w3.org/ns/api-perms/geolocation"></resource-match></condition></rule><rule effect="deny"></rule><DataHandlingPreferences PolicyId="#current-John Lyle-Another Example"><AuthorizationsSet><AuthzUseForPurpose><Purpose>http://www.w3.org/2002/01/P3Pv1/current</Purpose></AuthzUseForPurpose></AuthorizationsSet><ObligationsSet></ObligationsSet></DataHandlingPreferences><ProvisionalActions><ProvisionalAction><AttributeValue>http://webinos.org/geolocation</AttributeValue><AttributeValue>#current-John Lyle-Another Example</AttributeValue><DeveloperProvidedDescription language="EN">         Geolocation is needed to trigger reminders based on your current          location.       </DeveloperProvidedDescription></ProvisionalAction><ProvisionalAction><AttributeValue>http://webinos.org/api/webnotification</AttributeValue><AttributeValue>#current-John Lyle-Another Example</AttributeValue><DeveloperProvidedDescription language="EN">         Notifications are used to alert you when a reminder is valid -          e.g., at a specific time or place.       </DeveloperProvidedDescription></ProvisionalAction><ProvisionalAction><AttributeValue>http://webinos.org/api/file</AttributeValue><AttributeValue>#current-John Lyle-Another Example</AttributeValue><DeveloperProvidedDescription language="EN">         Your reminders are stored in files on the file system       </DeveloperProvidedDescription></ProvisionalAction><ProvisionalAction><AttributeValue>http://webinos.org/feature/internet</AttributeValue><AttributeValue>#current-John Lyle-Another Example</AttributeValue><DeveloperProvidedDescription language="EN">         Internet access is used to load Google Maps       </DeveloperProvidedDescription></ProvisionalAction></ProvisionalActions></policy><policy><target><subject><subject-match attr="id" match="John Lyle-Proximity Reminders"></subject-match></subject></target><rule effect="permit"><condition combine="or"><resource-match attr="api-feature" match="http://webinos.org/feature/internet"></resource-match><resource-match attr="api-feature" match="http://webinos.org/api/file"></resource-match><resource-match attr="api-feature" match="http://www.w3.org/ns/api-perms/geolocation"></resource-match></condition></rule><rule effect="deny"></rule><DataHandlingPreferences PolicyId="#current-John Lyle-Proximity Reminders"><AuthorizationsSet><AuthzUseForPurpose><Purpose>http://www.w3.org/2002/01/P3Pv1/current</Purpose></AuthzUseForPurpose></AuthorizationsSet><ObligationsSet></ObligationsSet></DataHandlingPreferences><ProvisionalActions><ProvisionalAction><AttributeValue>http://webinos.org/geolocation</AttributeValue><AttributeValue>#current-John Lyle-Proximity Reminders</AttributeValue><DeveloperProvidedDescription language="EN">         Geolocation is needed to trigger reminders based on your current          location.       </DeveloperProvidedDescription></ProvisionalAction><ProvisionalAction><AttributeValue>http://webinos.org/api/webnotification</AttributeValue><AttributeValue>#current-John Lyle-Proximity Reminders</AttributeValue><DeveloperProvidedDescription language="EN">         Notifications are used to alert you when a reminder is valid -          e.g., at a specific time or place.       </DeveloperProvidedDescription></ProvisionalAction><ProvisionalAction><AttributeValue>http://webinos.org/api/file</AttributeValue><AttributeValue>#current-John Lyle-Proximity Reminders</AttributeValue><DeveloperProvidedDescription language="EN">         Your reminders are stored in files on the file system       </DeveloperProvidedDescription></ProvisionalAction><ProvisionalAction><AttributeValue>http://webinos.org/feature/internet</AttributeValue><AttributeValue>#current-John Lyle-Proximity Reminders</AttributeValue><DeveloperProvidedDescription language="EN">         Internet access is used to load Google Maps       </DeveloperProvidedDescription></ProvisionalAction></ProvisionalActions></policy></policy-set>');
        });
    });
});

