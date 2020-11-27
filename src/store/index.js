import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        projectData: [
            {id: 1, name: '项目名称1'},
            {id: 2, name: '项目名称2'},
            {id: 3, name: '项目名称3'},
        ],
        userData: [
            {id: 1, name: 'user1'},
            {id: 2, name: 'user2'},
            {id: 3, name: 'user3'},
            {id: 4, name: 'user4'},
            {id: 5, name: 'user5'},
        ],
        projectAuthorization: [
            {
                id: 1,
                data: [
                    {user_id: 1, authorization: 7},
                    {user_id: 2, authorization: 3},
                    {user_id: 3, authorization: 3},
                    {user_id: 4, authorization: 1},
                ]
            },
            {
                id: 2,
                data: [
                    {user_id: 5, authorization: 7},
                    {user_id: 6, authorization: 3},
                    {user_id: 7, authorization: 3},
                    {user_id: 8, authorization: 1},
                ]
            },
            {
                id: 3,
                data: [
                    {user_id: 9, authorization: 7},
                    {user_id: 10, authorization: 3},
                    {user_id: 11, authorization: 3},
                    {user_id: 13, authorization: 1},
                ]
            },
        ],
        dataset: [
            {id: 1, name: '疫情数据集', table: []},
            {id: 2, name: 'Twritter数据集', table: []},
            {id: 3, name: '美国大选数据集', table: []},
            {id: 4, name: '其他...', table: []},
        ],

 
        currentProjectAuthorization: [
            {user_id: 1, authorization: 7},
            {user_id: 2, authorization: 3},
            {user_id: 3, authorization: 3},
            {user_id: 4, authorization: 1},
        ],

    },
    mutations: {
        
    },
    getters: {
        
    }
})
