import { HttpParams } from '@angular/common/http';

export class QueryParam {
  public static setRequestParams<T extends object>(filters: T): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(filters).forEach((filterKey: string) => {
      httpParams = QueryParam.setParamIfExists(httpParams, filters, filterKey);
    });
    return httpParams;
  }

  private static setParamIfExists<T>(
    params: HttpParams,
    request: T,
    name: string
  ): HttpParams {
    const paramValue = request[name as keyof T];
    if (paramValue || paramValue === 0 || paramValue === '') {
      if (Array.isArray(paramValue) && paramValue.length > 0) {
        return params.set(name, paramValue.join(','));
      } else if (paramValue || paramValue === 0) {
        return params.set(name, String(paramValue));
      }
    }
    return params;
  }
}
