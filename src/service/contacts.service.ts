import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Contact} from "../models/contact.model";
import {Group} from "../models/group.model";

@Injectable()
export class Contacts {
    constructor(public http: Http) {}
    dataUrl: string;
    /**
     * Get contacts data
     * @returns {Promise<TResult|T>}
     */
    getContacts(dataUrl) {
        return this.http.get(dataUrl)
            .toPromise()
            .then(response => response.json())
            .catch(err => {
                return Promise.reject(err)
            })
    }

    /**
     * Grouping contacts
     * @param array
     * @returns {any}
     */
    grouping(array: Contact[]): Group[] {
        let groupContacts: Group[] = [];
        const letterStr = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (array.length <= 0) return [];

        // Create a parent container
        groupContacts = letterStr.split('')
            .map((str) => {
                return {
                    groupName: str,
                    contacts: []
                }
            });

        // Push into the correct group
        groupContacts.forEach((item) => {
            for (let i of array) {
                if (i.pinyin[0].toUpperCase() === item.groupName) {
                    item.contacts.push(i);
                } else if (letterStr.indexOf(i.pinyin[0].toUpperCase()) === -1) {
                    groupContacts[groupContacts.length - 1].contacts.push(i)
                }
            }
        });
        
        let tempContacts: Group[]=[];
        groupContacts.forEach((item) => {
            if(item.contacts.length != 0){
                tempContacts.push(item);
            }
        });
        return tempContacts;

    }

}
