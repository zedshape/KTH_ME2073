import axios from 'axios';
const API_URL = 'http://141.223.239.241:8000';

export default class TravelsService{
    constructor(){}
    getUsers() {
        const url = `${API_URL}/api/travels/`;
        return axios.get(url).then(response => response.data);
    }
    getUsersByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getUser(user) {
        const url = `${API_URL}/api/travels/${user}`;
        return axios.get(url).then(response => response.data);
    }
    deleteUser(user){
        const url = `${API_URL}/api/travels/${user.pk}`;
        return axios.delete(url);
    }
    createUser(user){
        const url = `${API_URL}/api/travels/`;
        return axios.post(url,user);
    }
    updateUser(user){
      var url = "";
      if(user.status == 0) {
        url = `${API_URL}/api/travels_update_0/${user.id}`;
      }
      if(user.status == 2) {
        url = `${API_URL}/api/travels_update_2/${user.id}`;
      }
      if(user.status == 3) {
        url = `${API_URL}/api/travels_update_3/${user.id}`;
      }
      else if(user.status == 1) {
        // update
        url = `${API_URL}/api/travels_update/`;
      }
      return axios.put(url,user);
    }
}
