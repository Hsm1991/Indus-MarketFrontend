import { StatusClaims } from "./enumerations/StatusClaims";
import { TypeClaim } from "./enumerations/TypeClaim";
import { Media } from "./media";
import { ClaimProductRef } from "./ClaimProductRef";

export class Claims {
  idClaims!: number;
  title!: string;
  description!: string;
  typeClaim!: TypeClaim;
  statusClaims!: StatusClaims;
  medias!:Media[];
  CreatedAt!: Date;
  ConsultAt!: Date;
  claimProductRefs!: ClaimProductRef[];
}

