import { Component, OnInit } from '@angular/core';
import { GuideService } from 'app/core/services/api/api-calls/guide/guide.service';
import { PortalService } from 'app/core/services/api/api-calls/portal/portal.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Portal } from 'app/core/models/portal.model';
import { GuideReport } from 'app/core/models/guide-report.model';

@Component({
  selector: 'app-guide-ranking-portal',
  templateUrl: './guide-ranking-portal.component.html',
  styleUrls: ['./guide-ranking-portal.component.scss']
})
export class GuideRankingPortalComponent implements OnInit {

    portals: Array<Portal>;
    searchForm: FormGroup;
    report: Array<GuideReport>;
    displayedColumns: string[] = ['guideName', 'score'];

  constructor(
      private guideService: GuideService,
      private portalService: PortalService,
      private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
      this.searchForm = this.formBuilder.group({
          date: [],
          portalId: []
      });
    this.getPortals();
  }

  private async getPortals(): Promise<void>{
      this.portalService.getPortals().subscribe((res: Array<Portal>) => {
          this.portals = res;
      });
  }

  public async submit(): Promise<void> {
      if (this.searchForm.invalid) {
          return; 
      }
      const date = this.searchForm.controls.date.value.toDate();
      this.guideService.getReportByPortalId(this.searchForm.controls.portalId.value, date).subscribe((res) => {
          this.report = res;
      });
  }

  

}
