// Using Angular, RxJS, and a given RosterService which has two methods getUsers and getArticles, write a RosterComponent. In this component:
// Import necessary Angular and RxJS dependencies.
// Create a Component with the selector conduit-roster, a standalone property set to true, and the appropriate template and style URLs.
// The component should have a userStats$ observable property.
// On initialization, the component should get users from rosterService, create an object with each user's stats, including a count of their articles, total likes, and the date of their first article.
// Then, get articles from rosterService. For each article, update the relevant user's stats.
// Finally, return a sorted array of users based on the total likes in descending order.
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { switchMap, map } from 'rxjs/operators';
import { RosterService } from './roster.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'conduit-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
})
export class RosterComponent implements OnInit {
  userStats$!: Observable<any[]>;

  constructor(private rosterService: RosterService) {}

  ngOnInit() {
    this.userStats$ = this.rosterService.getUsers().pipe(
      switchMap((data) => {
        const userStatsDict: any = {};
        const userObjects = Object.values(data);
        let cnt = 1;
        for (let userObject of userObjects) {
          const username = userObject.user.username;
          userStatsDict[cnt] = {
            username: username,
            profileLink: `/profile/${username}`,
            articleCount: 0,
            totalLikes: 0,
            firstArticleDate: null,
          };
          cnt++;
        }
        return this.rosterService.getArticles().pipe(
          map((response) => {
            const articles = response.articles;
            for (const article of articles) {
              const authorId = article.author.id;
              const stats = userStatsDict[authorId];
              if (stats) {
                stats.articleCount++;
                stats.totalLikes += article.favoritesCount;
                const articleDate = new Date(article.createdAt);
                if (!stats.firstArticleDate || articleDate < new Date(stats.firstArticleDate)) {
                  stats.firstArticleDate = articleDate;
                }
              }
            }
            return Object.values(userStatsDict).sort((a: any, b: any) => b.totalLikes - a.totalLikes);
          }),
        );
      }),
    );
  }
}
