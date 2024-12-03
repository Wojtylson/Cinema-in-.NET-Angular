**PROJEKT KINO WWF**<br>
Projekt kino zawiera emulację systemu rezerwacji biletów w kinie. <br>
**WYKORZYSTANE TECHNOLOGIE**
Angular 17.3.8<br>
.NET 8.0.303 (w tym Entity Framework 8.0.7)
SQL Server Management Studio 20
SQL Server 2022<br>
**CZEGO SIE NIE UDAŁO ZROBIĆ**<br>
Niestety z braku czas oraz być może braku pewnych umiejętności zabrakło edycji przez admina list rezerwacji poszczególnych użytkowników,, braku wyświetlenia listy rezerwacji użytkownika a także wszystkich użytkowników dla admina,wybór filmu i godzin nie jest w 100 procentach zgodny z poleceniem, z powodu nieuwagi użytkownicy nie mają imion i nazwisk jedynie login i hasło. Na pewno o czyms zapomniałem ale generalnie to chyba najwazniejsze brakujące funkcjonalności.<br>
**JAK URUCHOMIĆ**<br>
Należy pobrać z gita oba foldery frontend i backend, a następnie otworzyć je za pomocą edytora (np. VS Code lub JetBrains IDE).
Trzeba zainstalowac następujące dodatki z NUGET:    Microsoft.AspNetCore.OpenApi                 8.0.7
   - Microsoft.EntityFrameworkCore                8.0.7
   - Microsoft.EntityFrameworkCore.Design         8.0.7
   - Microsoft.EntityFrameworkCore.SqlServer      8.0.7
   - Microsoft.EntityFrameworkCore.Tools          8.0.7 
   - Swashbuckle.AspNetCore                       6.4.0 
   <br>

Żeby połączyć się z bazą danych należy w pliku appsettings.json ustawić:<br>
*"DefaultConnection": "Server=.\\SQLExpress;Database=Kino;Trusted_Connection=True;TrustServerCertificate=True;"*
<br>
Aby utworzyć bazę i włączyć backend, czyli Web API należy w terminalu wpisać:
```
- `dotnet ef migrations add InitialCreate`
- `dotnet ef database update
```
<br>
A następnie uruchomić projekt klikając "Run project associated with this file";
<br>
Aby uruchomić frontend trzeba otworzyć folder frontend w edytorze kodu, upewnić się, że posiadana jest właściwa wersja Angulara i w terminalu wpisać:<br>

- `ng serve --ssl true`

<br>
Jeśli o niczym nie zapomniałem, a także jeśli wszystko udało się włączyć to program powinien się włączyć.
