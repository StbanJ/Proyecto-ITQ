import { Component, OnInit } from '@angular/core';
import { PeliService } from 'src/app/services/peli.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pelis-details',
  templateUrl: './pelis-details.page.html',
  styleUrls: ['./pelis-details.page.scss'],
})
export class PelisDetailsPage implements OnInit {
content: object = null;

  constructor(private peliService: PeliService, private activatedRouter: ActivatedRoute ) { }

  ngOnInit() {
    let id = this.activatedRouter.snapshot.paramMap.get('id');
    this.peliService.getDetails(id).subscribe(result => this.content = result);
  }

}
