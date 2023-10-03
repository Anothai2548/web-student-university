import http from '../config/http-common';

class TutorialDataService {
    getAll() {
        return http.get('/students');
    }

    get(id) {
        return http.get('/students/' + id);
    }

    create(data) {
        return http.post('/students', data);
    }

    update(id, data) {
        return http.put('/students' + id, data);
    }

    delete(id) {
        return http.delete('/students' + id);
    }

    deleteAll() {
        return http.delete('/students');
    }

    findByTitle(title) {
        return http.get('/students?stu_name = ' + title)
    }
}

export default new TutorialDataService();