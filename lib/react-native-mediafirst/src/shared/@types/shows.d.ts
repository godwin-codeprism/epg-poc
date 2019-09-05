export interface Genre {
    Id: string;
    Name: string;
}

export interface Image {
    Size: string;
    ImageType: string;
    Uri: string;
}

export interface AudioTags {
    ClosedCaptioned?: any;
}

export interface EPGShow {
    StationId: string;
    GlfStationId: string;
    ProgramId: string;
    GlfProgramId: string;
    StartUtc: Date;
    EndUtc: Date;
    Name: string;
    Description: string;
    ReleaseYear: number;
    Genres: Genre[];
    Ratings: any[];
    IsAdult: boolean;
    IsNew: boolean;
    ShowType: string;
    Images: Image[];
    SupportedImages: string[];
    ImageBucketId: string;
    Entitlements: string[];
    CatchupStartUtc: Date;
    CatchupEndUtc: Date;
    IsGeneric: boolean;
    AudioTags: AudioTags;
    Tags: string[];
}

export interface Shows {
    [key: string]: EPGShow[];
}
