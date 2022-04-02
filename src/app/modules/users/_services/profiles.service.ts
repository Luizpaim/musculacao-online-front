    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { Observable } from 'rxjs';
    import { AuthService } from 'src/app/core/_services/auth.service';
    import { BaseResponse } from 'src/app/shared/models/base-response.model'; 
    import { environment } from 'src/environments/environment';
    import { Profile } from '../_models/profile.model';

    @Injectable({
    providedIn: 'root'
    })
    export class ProfilesService {

    baseUrl = `${environment.urlApi}profiles`;

    constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

    getAll(): Observable<BaseResponse<Profile[]>> {
    return this.http.get<BaseResponse<Profile[]>>(this.baseUrl);
    }

    getById(id: string): Observable<BaseResponse<Profile>> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<BaseResponse<Profile>>(url);
    }

    }
