import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Personaje } from 'src/app/interfaces/Personaje';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  personajes!: Personaje[];
  personajesCopy!: Personaje[];

  constructor(private http: HttpClient) {
    this.getData();
  }

  filter(e: any) {
    const search: string = e.target.value;
    //console.log({search});
    this.personajes = this.personajesCopy?.filter(({name}: Personaje)=>{
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }

  async getData() {
    await this.http
      .get<any>(environment.apiUrl + '/characters')
      .subscribe((res) => {
        this.personajes = res.map(
          ({ char_id, name, nickname, img, status, occupation }: Personaje) => {
            return {
              char_id: char_id,
              name: name,
              nickname: nickname,
              img: img,
              status: status,
              occupation: occupation,
            };
          }
        );
        this.personajesCopy = this.personajes;
      });
  }
}
