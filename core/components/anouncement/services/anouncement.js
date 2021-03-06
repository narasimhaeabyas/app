// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.core.anouncement')

/**
 * Service to handle site courses.
 *
 * @module mm.core.courses
 * @ngdoc service
 * @name $mmCourses
 */
.factory('$mmAnouncement', function($q, $mmSite, $mmSitesManager, mmTimetableFrontPage) {

    var self = {},
        currentCourses = {};

    function storeAnouncementInMemory(anouncement) {
        angular.forEach(anouncement, function(anouncement) {
            currentAttendence[anouncement.id] = anouncement;
        });
    }

    /**
     * Get a course stored in memory.
     *
     * @param  {Number} id ID of the course to get.
     * @return {Object}    Course.
     */
    self.getStoredCourse = function(id) {
        return currentAnouncement[id];
    };

    /**
     * Get user courses.
     *
     * @module mm.core.courses
     * @ngdoc method
     * @name $mmCourses#getUserCourses
     * @param {Boolean} [refresh] True when we should not get the value from the cache.
     * @param {String} [siteid]   Site to get the courses from. If not defined, use current site.
     * @return {Promise}          Promise to be resolved when the courses are retrieved.
     */
    self.getUserAnouncement = function(refresh, siteid) {
        siteid = siteid || $mmSite.getId();

        var userid = $mmSite.getUserId(),
            presets = {},
            data = {userid: userid};

        if (typeof userid === 'undefined') {
            return $q.reject();
        }

        if (refresh) {
            presets.getFromCache = false;
        }

        return $mmSitesManager.getSite(siteid).then(function(site) {
            return site.read('local_user_announcements_custom', data, presets).then(function(anouncement) {
               // storeCoursesInMemory(attendence);
                return anouncement;
            });
        });
    };

    return self;
});
