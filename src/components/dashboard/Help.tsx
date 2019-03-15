import * as React from 'react';
import { Divider, Paper, Typography, withStyles, List,ListItemText,ListItemIcon,ListItem } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import LaughIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import messages from '../../constants/messages';

const styles = (theme: any) => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
      paddingBottom: theme.spacing.unit * 2,
    },
    text: {
        padding: 15,
        fontSize: '0.85em',
        lineHeight: '2',
        textAlign: 'justify'
    },
    teamSection: {
        padding: 15,
        fontSize: '1em'
    },
    title: {
        padding: '0 15px 15px'
    },
    listIcon: {
        marginRight:0
    },
    corbikaListTitle: {
        display: 'block',
        marginTop:15,
        fontWeight: 'bold',
        fontSize: '1em'
    }
  });

export type HelpProps = {
    classes: any
}

class Help extends React.Component<HelpProps, Readonly<{}>>{
    render(){
        const { classes } = this.props;
        return(
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3" className={classes.title}>
            {messages.corebikaStory}
        </Typography>
        <Divider/>
        <Typography variant="body2" component="p" className={classes.text}>
        جشن پایان سال، بهونه خوبیه تا چند دقیقه ای به انجام بازی های سرگرم کننده مشغول بشیم و واسه چند دقیقه هم که شده از دست بروزهای FCB راحت باشیم.
       <br/>
       بازی هایی که هرساله برگزار می شد بازی های فیزیکی بودند که با انجام اونها لحظات خوشی رو کنار جمع گرم و صمیمی همکارامون میگذروندیم، امسال تصمیم گرفتیم تا یه کار جدید رو انجام بدیم تا بازی هامون داغترو پرهیجان تر برگزار بشن و همه یه جوری با این بازی ها درگیر بشن.
تصمیم گرفتیم یه اپلیکیشن پیاده سازی کنیم.
        <br/>
        چالش اولمون انتخاب اسم بود،میخواستیم یه اسمی بذاریم که هم یه جورایی به Core مرتبط باشه و هم یه اسم جالب و جذاب باشه، اسمی که انتخاب کردیم کربیکا هست.
            <br/>
            اما چالش بعدیمون تصمیم گیری در مورد نیازمندی ها و مواردی بود که باید پیاده سازی میشد، بعد از کلی جلسات سنگین و فشرده به این نتیجه رسیدیم که اپلیکیشنمون باید :
            <br/>
            <List >
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText  primary="هوش مصنوعی داشته باشه" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText  primary="توش تبلیغات نداشته باشیم" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText  primary="به افزایش اطلاعات عمومی کاربرامون کمک کنه" />
            </ListItem>
                <ListItem >
                    <ListItemIcon className={classes.listIcon}>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText  primary="مشکل پیدا کردن جای پارک رو حل کنه" />
                </ListItem>
                <ListItem >
                    <ListItemIcon className={classes.listIcon}>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText  primary="مشکل بسته بودن همیشگی دستشویی های core رو حل کنه" />
                </ListItem>
                <ListItem >
                    <ListItemIcon className={classes.listIcon}>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText  primary="کمک کنه بعضی ها پوست بهتری داشته باشن!!!" />
                </ListItem>
                <ListItem >
                    <ListItemIcon className={classes.listIcon}>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText  primary="مشکل پیدا نشدن نون موقع ناهار رو حل کنه" />
                </ListItem>
                <ListItem >
                    <ListItemIcon className={classes.listIcon}>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText  primary="جلوی بروزهای FCB رو بگیره" />
                </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText  primary="بشه باهاش از فروشگاه های اینترنتی خرید کرد" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText  primary="زمانبندی روزانه کاربرارو مدیریت کنه" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText  primary="به کاهش آلودگی هوا کمک کنه" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText  primary="بشه باهاش بلیط هواپیما و قطار رزرو کرد" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText  primary="کلی موقعیت شغلی جدید ایجاد کنه" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText  primary="جلوی نوسانات ارز و طلارو رو بگیره" />
            </ListItem>
            <ListItem >
                <ListItemText  primary="و..." />
            </ListItem>
            </List>
            ولی وقتی نوبت به پیاده سازی رسید متوجه شدیم که چهار پنج روز بیشتر زمان نداریم،برا همین تصمیم گرفتیم فعلا یه نسخه اولیه رو به جشن برسونیم و بعدا به مرور زمان اپلیکیشنمونو کاملو کامل تر کنیم.از لیستی که چندخط بالاتر ذکر کردم هیچکدومشو نرسیدیم پیاده کنیم و فقط برای چند موردش یه سری کلیپ تبلیغتی بامزه (البته بامزه از نظرخودمون) درست کردیم،اما یه سری کارای باحال هم انجام دادیم که شاید خوشتون بیاد.
            <br/>
            <span className={classes.corbikaListTitle}>خب حالا با این کربیکا چیکارا می شه کرد ؟ </span>
            <List >
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText primary="موقع اجرای بازی های فیزیکی میشه برنده رو پیش بینی کرد" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText primary="یه سری بازی های چند گزینه ای داریم که می تونید توی اونها شرکت کنید" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText primary="میتونید توی رای گیری مربوط به انتخاب بهترین بازیگر کلیپ شرکت کنید" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText primary="میتونید آرای مربوط به هر بازیگر رو ببینید" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText primary="میتونید امتیازهای خودتونو ببینید" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText primary="میتونید لیست پرامتیازترین شرکت کننده هارو ببیند" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText primary="قرعه کشی داریم که میتونید توی قرعه کشی ثبت نام کنید" />
            </ListItem>
            </List>
        </Typography>
        <Typography variant='h6' className={classes.teamSection}>
         پیاده سازی کربیکا با همکاری چهار تیم زیر انجام شد:
        <List >
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText primary="تیم عملیات : احسان خدادادی" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText primary="تیم بک اند : دانش رضوی" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText primary="تیم فرانت اند : سعید شاملو" />
            </ListItem>
            <ListItem >
                <ListItemIcon className={classes.listIcon}>
                <StarIcon />
                </ListItemIcon>
                <ListItemText primary="تبلیغات و بازاریابی : حسین مسبوق" />
            </ListItem>
            </List>
             در ضمن اگر نظر،انتقاد یا پیشنهادی داشتید که به بهبود کربیکا کمک میکنه میتونید نظراتتون رو برای خودتون نگه دارید چون ما دیگه وقت نداریم.
             <LaughIcon/>
        </Typography>
      </Paper>
        );
    }
}

export default withStyles(styles as any)(Help);