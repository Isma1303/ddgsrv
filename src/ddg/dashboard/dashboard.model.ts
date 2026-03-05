import { Model } from "../../system/model";

export class DashboardModel extends Model<never, never, never> {
  constructor() {
    super();
  }

  async getDashboardSummary(){
    return {
        // data: await this.getKpis()
    }
  }

  // async getKpis() {
  //   try {
  //     const pool = await this.pool();

  //     const assignamentAverageQuery = await pool.raw(`
  //           WITH per_event AS (
  //               SELECT
  //                   a.service_event_id,
  //                   COUNT(*) AS attendees
  //               FROM ddg.attendance a
  //               JOIN ddg.service_events se
  //                 ON se.service_event_id = a.service_event_id
  //               WHERE se.service_date >= date_trunc('month', current_date)
  //                 AND se.service_date <  (date_trunc('month', current_date) + interval '1 month')
  //               GROUP BY a.service_event_id
  //           )
  //           SELECT
  //               (date_trunc('month', current_date) + interval '1 month' - interval '1 day')::date AS period_end,
  //               COALESCE(AVG(attendees::numeric), 0) AS avg_attendees_per_event
  //           FROM per_event;
                
  //           `);

  //     const activeUsersQuery = await pool.raw(
  //       `
  //               SELECT 
  //               COUNT(u.*) as total_users
  //               FROM admin.users u
  //               JOIN admin.user_roles ur on u.user_id = ur.user_id 
  //               JOIN admin."role" r on ur.role_id = r.role_id
  //               WHERE r.role_cd  in ('LEADER', 'USER') and u.is_active  = TRUE
  //               `,
  //     );

  //     const [assignamentAverage] = await assignamentAverageQuery();
  //     const [activeUsers] = await activeUsersQuery();

  //     return {
  //       assignamentAverage,
  //       activeUsers,
  //     };
  //   } catch (error: any) {
  //       throw error.message
  //   }
  // }
}
