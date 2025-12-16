using Account.Domain.Enum;
using System.Collections.Generic;

namespace Account.Domain.Dictionaries
{
    public static class ErrorDictionary
    {
        private static readonly Dictionary<ErrorCodes, int> _httpStatusMap = new()
        {
            // Аутентификация
            [ErrorCodes.UserAlreadyExists] = 409,       
            [ErrorCodes.UserNotFound] = 404,            
            [ErrorCodes.UnauthorizedAccess] = 401, 
            [ErrorCodes.PasswordNotEqualsPasswordConfirm] = 400, 
            [ErrorCodes.PasswordIsWrong] = 401,

            [ErrorCodes.IndicatorAlreadyExists] = 409,

            // Ролевая политика
            [ErrorCodes.RoleAlreadyExists] = 409,
            [ErrorCodes.RoleNotFound] = 404,
            [ErrorCodes.UserAlreadyExistsThisRole] = 409,

            // Системные
            [ErrorCodes.InternalServerError] = 500      
        };

        public static int GetHttpStatus(ErrorCodes errorCode)
        {
            if (_httpStatusMap.TryGetValue(errorCode, out int httpStatus))
                return httpStatus;

            return 400; 
        }
    }
}