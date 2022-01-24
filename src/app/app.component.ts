import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-enterprise/secure-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private database: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    try {
      const db = await this.sqlite.create({
        name: "mydb",
        location: "default",
        key: "password"
      });

      this.database = db;

      await db.executeSql('CREATE TABLE IF NOT EXISTS software(name, company, type, version)', [])
    } catch (e) {
      console.error('Unable to initialize database', e);
    }
  }
}
