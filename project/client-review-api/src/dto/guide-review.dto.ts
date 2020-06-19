
export interface IGuideReview {
    GudieReviewID:number;
    TourID:number | null;
    MeetingPointHour:Date;
    DepartureTime:Date;
    BusStatus:string;
    DriverClothingStatus:string;
    WifiStatus:string;
    MicrofonStatus:string;
    LunchTimeStatus:string;
    WineTastingStatus:string;
    GuideWineryStatus:string;
    AssistantGuideStatus:string;
    GuidaStatus:string;
    RestorantStatus:string;
    Problems:string;
    ReturnHour:Date;
    SoldTours:string | null;
}

export class GuideReviewDto implements IGuideReview {
    public GudieReviewID:number;
    public TourID:number | null;
    public MeetingPointHour:Date;
    public DepartureTime:Date;
    public BusStatus:string;
    public DriverClothingStatus:string;
    public WifiStatus:string;
    public MicrofonStatus:string;
    public LunchTimeStatus:string;
    public WineTastingStatus:string;
    public GuideWineryStatus:string;
    public AssistantGuideStatus:string;
    public GuidaStatus:string;
    public RestorantStatus:string;
    public Problems:string;
    public ReturnHour:Date;
    public SoldTours:string | null;

}
