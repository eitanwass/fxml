import { parse } from "./fxml";
import * as txml from "txml";
import * as fs from "fs";


const sampleXML = `<root>
   <listing>
      <seller_info>
         <seller_name>jenzen12 </seller_name>
         <seller_rating>new </seller_rating>
      </seller_info>
      <payment_types>Accepts Credit Cards (MC, VISA)
      </payment_types>
      <shipping_info>* Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info> Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$310.00 </current_bid>
         <time_left>4 days </time_left>
         <high_bidder>
            <bidder_name>mike_and_colleen </bidder_name>
            <bidder_rating>1 </bidder_rating>
         </high_bidder>
         <num_items>5 </num_items>
         <num_bids>27 </num_bids>
         <started_at>$10.00 </started_at>
         <bid_increment>$5.00 </bid_increment>
         <location>Costa Meca, CA </location>
         <opened>Nov 27 00:24 PST </opened>
         <closed>Dec 02 10:24 PST </closed>
         <id_num>45519743 </id_num>
         <notes> Seller can close auction early.
            * Auction may get automatically extended </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>$310.00
         </highest_bid_amount>
         <quantity>1 </quantity>
      </bid_history>
      <item_info>
         <memory>128MB RDRAM </memory>
         <hard_drive>
            40GB Ultra ATA Hard Drive (7200RPM)</hard_drive>
         <cpu>Pentium III </cpu>
         <brand>Dell Dimension 8100 Series </brand>
         <description>Dell's NEW
            Dimension features
            the Intel
            Pentium 4
            Processor! With
            leading edge
            performance and a
            brand new
            computing
            architecture, this
            system is designed
            for speed and power
            so you can enjoy the
            latest in audio,
            video, and Internet
            technologies.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>webaxion </seller_name>
         <seller_rating>31 </seller_rating>
      </seller_info>
      <payment_types> Accepts Yahoo! PayDirect
         * Accepts Personal Checks
         * Accepts Cashiers Checks and Money
         Orders
         * Accepts Credit Cards (MC, VISA)
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info> Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$53.50 </current_bid>
         <time_left>1 day </time_left>
         <high_bidder>
            <bidder_name>eldrdge1 </bidder_name>
            <bidder_rating>new </bidder_rating>
         </high_bidder>
         <num_items>1 </num_items>
         <num_bids> 4 </num_bids>
         <started_at>$20.00 </started_at>
         <bid_increment>$2.50 </bid_increment>
         <location>Charlotte, NC </location>
         <opened>Nov 23 05:57
            PST </opened>
         <closed>Nov 29 05:57
            PST </closed>
         <id_num>45245937 </id_num>
         <notes>Seller can close auction early.
            * Auction does not get automatically
            extended. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory> </memory>
         <hard_drive> </hard_drive>
         <cpu> </cpu>
         <brand> </brand>
         <description> Visioneer Strobe Pro NT integrates the most advanced paper management
            software
            with our unique compact sheet fed color scanner. The result is the ideal solution for
            streamlining information that makes it easy to find what you're looking for- even if you
            don't remember where you put it. With our Paper-driven? technology, you just feed in
            your color or black and white documents or images; Visioneer Strobe Pro NT
            automatically launches the PaperPort Deluxe software, and places your documents and
            images on the PaperPort desktop. and images on the PaperPort desktop.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>kriisvs </seller_name>
         <seller_rating>19 </seller_rating>
      </seller_info>
      <payment_types>Accepts Cashiers Checks and
         Money Orders
         * Accepts Credit Cards (MC,
         VISA)
      </payment_types>
      <shipping_info>Seller Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info> Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$2.99 </current_bid>
         <time_left>4 hrs </time_left>
         <high_bidder>
            <bidder_name>wnba088 </bidder_name>
            <bidder_rating>1 </bidder_rating>
         </high_bidder>
         <num_items>999 </num_items>
         <num_bids>5 </num_bids>
         <started_at>$2.99 </started_at>
         <bid_increment>$0.10 </bid_increment>
         <location>Haliburton, Ontario CA </location>
         <opened>Nov 25 18:09 PST </opened>
         <closed>Nov 27 18:09 PST </closed>
         <id_num>45416810 </id_num>
         <notes> Auction does not get automatically extended.
            * Seller will ship internationally. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory> </memory>
         <hard_drive> </hard_drive>
         <cpu> </cpu>
         <brand> </brand>
         <description>
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>boy1der_1998 </seller_name>
         <seller_rating>5 </seller_rating>
      </seller_info>
      <payment_types>Accepts Yahoo! PayDirect
         * Accepts Personal Checks
         * Accepts Cashiers Checks and Money
         Orders
      </payment_types>
      <shipping_info> Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info>* Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$1,334.00 </current_bid>
         <time_left>2 days </time_left>
         <high_bidder>
            <bidder_name> </bidder_name>
            <bidder_rating> </bidder_rating>
         </high_bidder>
         <num_items>5 </num_items>
         <num_bids>0 </num_bids>
         <started_at> $1,334.00</started_at>
         <bid_increment>$10.00 </bid_increment>
         <location>Charleston, SC </location>
         <opened>Nov 19 15:00
            PST </opened>
         <closed>Nov 19 15:00
            PST </closed>
         <id_num>44993324 </id_num>
         <notes>Seller can close auction early.
            * Auction may get automatically
            extended. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory>128 MB PC-100 SDRam </memory>
         <hard_drive>20 GB 7200 RPM Hard
            Drive </hard_drive>
         <cpu>Intel Pentium III 800 MHz CPU </cpu>
         <brand> </brand>
         <description> Intel Pentium III 800 MHz CPU * 128 MB PC-100 SDRam * 20 GB 7200 RPM Hard
            Drive * 56K Soft Modem * 16X DVD/40X CD-Rom Drive * Built on Sound and Video
            * Keyboard, Mouse and Speakers * Windows 98 or ME 17" AOC 3 year Warranty
            Monitor 1 year 24 x 7 ON Site Warranty-Nationwide Shipping and Handling is an
            addional: $75.00 for UPS Ground. Faster services are availible. ALL Personal Checks
            must Clear First.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>coronasystems </seller_name>
         <seller_rating>12 </seller_rating>
      </seller_info>
      <payment_types>Accepts Personal Checks
         * Accepts Cashiers Checks and Money
         Orders
         * Accepts Credit Cards (MC, VISA)
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info>Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$120.25 </current_bid>
         <time_left>2 days </time_left>
         <high_bidder>
            <bidder_name>turaxm </bidder_name>
            <bidder_rating>3 </bidder_rating>
         </high_bidder>
         <num_items>3 </num_items>
         <num_bids> 23 </num_bids>
         <started_at>$1.00 </started_at>
         <bid_increment>$5.00 </bid_increment>
         <location>Bridgeport, WV </location>
         <opened>Nov 21 13:07
            PST </opened>
         <closed>Nov 29 15:07
            PST </closed>
         <id_num>45128630 </id_num>
         <notes>Auction may get automatically
            extended. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>$120.25
         </highest_bid_amount>
         <quantity>1 </quantity>
      </bid_history>
      <item_info>
         <memory> </memory>
         <hard_drive> </hard_drive>
         <cpu>Pentium III FCPGA </cpu>
         <brand> </brand>
         <description>

            How would you like a Custom Built System?
            Built in our labs by Industry Certified Engineers and
            Technicians
            Backed by a full year warranty.
            System Details
            Name brand motherboard
            Pentium III FCPGA Motherboard - Supports up to 1064
            MHz Processor
            Can be upgraded !

            32MB AGP Video Card
            System Sdram video
            Up to 64 MB AGP 4X Video!
            Can be upgraded !

            3D Sound Included!
            Support for up to 4 speakers
            Can be upgraded to SoundBlaster Live!

            56K V.90 FaxModem
            Send faxes or connect online.
            See below for special web hosting free gift !

            Case and Power Supply

            PS/2 Ports
            USB Ports

            Drive cables


            Drivers Disk and Software

            What your bid gets you:
            The System above

            Free design assistance from our certified
            staff
            Not sure what you need?
            Not a computer whiz?
            Don't know a megabyte from a gigabyte?

            Don't worry - we'll assist you at each step.

            Build your system - the way you want it.
            We help you with the design, and then we
            construct it for you.
            Free.

            All design and labor costs are included in the
            base unit.

            You choose the upgrades you want at
            wholesale prices!
            And we install them free!
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>lizjb40 </seller_name>
         <seller_rating>69 </seller_rating>
      </seller_info>
      <payment_types>Accepts Personal Checks
         * Accepts Cashiers Checks and
         Money Order
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info> Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$180.00 </current_bid>
         <time_left>2 days </time_left>
         <high_bidder>
            <bidder_name>salaam624 </bidder_name>
            <bidder_rating>1 </bidder_rating>
         </high_bidder>
         <num_items>1 </num_items>
         <num_bids>1 </num_bids>
         <started_at>$180.00 </started_at>
         <bid_increment>$5.00 </bid_increment>
         <location>Colonial Beach, VA </location>
         <opened>Nov 26 14:03 PST </opened>
         <closed>Nov 29 19:03 PST </closed>
         <id_num>45471155 </id_num>
         <notes> seller can close auction early.
            * Auction may get automatically extended. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>$180.00
         </highest_bid_amount>
         <quantity>1 </quantity>
      </bid_history>
      <item_info>
         <memory> </memory>
         <hard_drive> </hard_drive>
         <cpu>800 MHz/ Intel Penntium III Processor </cpu>
         <brand> </brand>
         <description> You are bidding on a RETAIL BOX INTEL PENNTIUM III 800 MHz/133 MHz
            System Bus CPU. Intel Penntium III Processor Product Features: 800MHZ Processor
            Core Speed - 133-MHz System Bus - 256KB On-Die Full-Speed L2 Cache - MMX
            Media Enhancement Technology - Fan Heatsink - All sales are final. I will shipp to
            the 48 United States, states ONLY! I will accept personal checks or Money Order for
            this item, however, I will hold shipment of the item for 6 days until the check clears
            the
            banks and Money Orders ship same day. As for shpping charges - $6.50 S&amp;H and
            Insurance.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>nex_gen_computers </seller_name>
         <seller_rating>1 </seller_rating>
      </seller_info>
      <payment_types>Accepts Personal Checks
         * Accepts Cashiers Checks and Money Orders
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info>Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$215.00 </current_bid>
         <time_left>4 days </time_left>
         <high_bidder>
            <bidder_name> </bidder_name>
            <bidder_rating> </bidder_rating>
         </high_bidder>
         <num_items>1 </num_items>
         <num_bids> 6 </num_bids>
         <started_at>$5.00 </started_at>
         <bid_increment> $1.00</bid_increment>
         <location>Los Angeles Ca </location>
         <opened>Nov 25 10:46 PST </opened>
         <closed>Dec 02 10:46 PST </closed>
         <id_num>44885977 </id_num>
         <notes> Auction does not get automatically
            extended.
            * Auction has a reserve price that has not
            been met. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory>64MB SyncDRAM (up to 768MB) </memory>
         <hard_drive>6.4GB HDD (Ultra DMA EIDE) </hard_drive>
         <cpu>Celeron 466MHz </cpu>
         <brand>Compaq Presario 5700 minitower </brand>
         <description> With a powerful Intel Celeron? 466MHz (w/128KB L2 Cache) processor the
            Presario
            5700 is good for everything. You can watch movies, play powerful games, browse the
            Internet at the highest speed available, do your everyday tasks, this computer is good
            at
            all this. It comes standard with a built-in 24x CD-ROM, huge 6.4GB hard drive (you
            will probably never use it all), internal 56K V.90 PCI Fax/Modem. This is a good
            advanced system, which is going to last forever. You can count on 5 and more years of
            work, there's plenty of 5 and more years old Compaqs that are still in use. Besides,
            Compaq has a very good technical support, so you won't have any problems looking for
            the drivers, for example. You can also order the quick restore CD, Compaq sends those
            for free.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>deg76 </seller_name>
         <seller_rating>2 </seller_rating>
      </seller_info>
      <payment_types>Accepts Yahoo! PayDirect
         * Accepts Personal Checks
         * Accepts Cashiers Checks and
         Money Orders
         * Accepts Credit Cards (MC, VISA)
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info>Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>799.00 </current_bid>
         <time_left>5 days </time_left>
         <high_bidder>
            <bidder_name> </bidder_name>
            <bidder_rating> </bidder_rating>
         </high_bidder>
         <num_items>1 </num_items>
         <num_bids> 0 </num_bids>
         <started_at>$799.00 </started_at>
         <bid_increment>$10.00 </bid_increment>
         <location>Winchester, VA </location>
         <opened>Nov 24 16:28 PST </opened>
         <closed>Dec 02 16:28 PST </closed>
         <id_num>45337675 </id_num>
         <notes> Seller can close auction early.
            * Auction may get automatically extended.
            * There is a buy price on this auction of
            $999.00. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory>64 Meg Ram </memory>
         <hard_drive>10 Gig HD </hard_drive>
         <cpu>Pentium III 650 MHZ Cpu </cpu>
         <brand> </brand>
         <description>Pentium III 650 MHZ Cpu NEW SYSTEM ATX Mid Tower 50X CDROM 10 Gig HD
            64 Meg Ram 8 Meg Video 56K Modem Sound 2 USB Ports Ethernet 10/100 Keyboard,
            Mouse, Speakers 15" Monitor 1 Year Parts and Labor E-Mail deg@shentel.net with
            address for exact shipping charges. Ships using UPS.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>mertztech </seller_name>
         <seller_rating>1 </seller_rating>
      </seller_info>
      <payment_types> Accepts Personal Checks
      </payment_types>
      <shipping_info> Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info> Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$315.00 </current_bid>
         <time_left>8 days </time_left>
         <high_bidder>
            <bidder_name>abestseller </bidder_name>
            <bidder_rating>4 </bidder_rating>
         </high_bidder>
         <num_items>1 </num_items>
         <num_bids> 8 </num_bids>
         <started_at>$95.00 </started_at>
         <bid_increment>$5.00 </bid_increment>
         <location>Williamsville, NY </location>
         <opened>Nov 25 12:01 PST </opened>
         <closed>Dec 05 18:01 PST </closed>
         <id_num>45045404 </id_num>
         <notes>Auction does not get automatically
            extended.
            * There is a buy price on this auction of
            $599.95. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>$315.00
         </highest_bid_amount>
         <quantity>1 </quantity>
      </bid_history>
      <item_info>
         <memory> 64MB SDRAM Memory</memory>
         <hard_drive>20GB Quantum Fireball IDE Hard Drive </hard_drive>
         <cpu>Intel Pentium III 800MHz Processor </cpu>
         <brand> </brand>
         <description>This is an incredible, brand new system just for you.
            Shipping &amp; Handling is $49.00 and paid for by the buyer.
            An e-mail will be sent upon receipt of payment. UPS
            Ground is method of shipping.
            PayPal is accepted!
            Personal checks, cashiers checks and money orders are
            accepted.
            All auction sales are final.
            New York state residence add 8% sales tax.
            Payment must be received within 5 days from close of
            auction.
            Allow 3-10 business days to process order and configure
            system after payment is received.
            One year parts and labor warranty as provided for by
            manufacturer. Seller will replace defective parts at sellers
            option.
            I understand and agree: If I do not pay and send my
            payment within 7 days after auction closing, all necessary
            costs will be forwarded to a collection agency; a 20%
            restocking fee is assessed for all equipment; I cannot
            return the product(everything listed above) after 30 days
            of purchase.
            30 Day warrenty. Manufacturer warrenty apply.
            If you have any questions regarding this purchase please
            e-mail us at jeff@mertztech.com.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>o
            econgo1 </seller_name>
         <seller_rating>new </seller_rating>
      </seller_info>
      <payment_types>Accepts Yahoo! PayDirect
         * Accepts Personal Checks
         * Accepts Cashiers Checks and Money
         Orders
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info>Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$1,500.00 </current_bid>
         <time_left>3 days </time_left>
         <high_bidder>
            <bidder_name> </bidder_name>
            <bidder_rating> </bidder_rating>
         </high_bidder>
         <num_items>1 </num_items>
         <num_bids> 0 </num_bids>
         <started_at>$1,500.00 </started_at>
         <bid_increment>$10.00 </bid_increment>
         <location>Tupelo, MS </location>
         <opened>Nov 26 11:54
            PST </opened>
         <closed> Dec 01 11:54
            PST</closed>
         <id_num>45463230 </id_num>
         <notes> Seller can close auction early.
            * Auction may get automatically
            extended.
            * Seller will ship internationally </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory>128MB RDRAM, </memory>
         <hard_drive>40GB
            Ultra ATA Hard Drive </hard_drive>
         <cpu>Intel Pentium III Processor at 1Ghz, </cpu>
         <brand> </brand>
         <description> (Your Computer Will Look Similar To The One Shown) This New Computer System
            comes with a blazing Intel Pentium III Processor at 1Ghz, 128MB RDRAM,40GB
            Ultra ATA Hard Drive,Sound Blaster Live! +MP3,Creative Labs Annihilator 2
            GeForce2 AGP Graphic Card, 19" Monitor, Creative Labs PC-DVD Encore 12X DVD,
            Microsoft Windows ME Operating System and A 3-Yr. Parts &amp; Labor Warranty. Ask
            for the new Pentium IV Processor at 1.4 &amp; 1.5GHz! If you have any questions please
            e-mail me or send me an instant message.
         </description>
      </item_info>
   </listing>

   <listing>
      <seller_info>
         <seller_name>cbear_net </seller_name>
         <seller_rating>1 </seller_rating>
      </seller_info>
      <payment_types>Accepts Yahoo! PayDirect
         * Accepts Cashiers Checks and Money
         Orders
         * Accepts Credit Cards (MC, VISA)
      </payment_types>
      <shipping_info>Buyer Pays Shipping
         * Seller Ships on Payment
      </shipping_info>
      <buyer_protection_info>Standard Protection Coverage
      </buyer_protection_info>
      <auction_info>
         <current_bid>$289.00 </current_bid>
         <time_left>1 day </time_left>
         <high_bidder>
            <bidder_name> </bidder_name>
            <bidder_rating> </bidder_rating>
         </high_bidder>
         <num_items>5 </num_items>
         <num_bids> 0 </num_bids>
         <started_at>$289.00 </started_at>
         <bid_increment>$5.00 </bid_increment>
         <location>Federal Way, WA </location>
         <opened>Nov 26 13:56 PST </opened>
         <closed>Nov 28 13:56 PST </closed>
         <id_num>44998107 </id_num>
         <notes> Auction does not get automatically
            extended. </notes>
      </auction_info>
      <bid_history>
         <highest_bid_amount>
         </highest_bid_amount>
         <quantity> </quantity>
      </bid_history>
      <item_info>
         <memory> </memory>
         <hard_drive> </hard_drive>
         <cpu>Intel Pentium III CPU </cpu>
         <brand> </brand>
         <description> Upgrade your system with Intel Pentium III CPU. QUICK GLANCE :This Product is
            brand new and pre-assembled! - Intel Pentium III 533MHz CPU and Heatsink - Intel
            SpeedStep Technology - Slot 1- 133MHz/256k - ASUS P3V4X JumperFree AGP/4X
            Motherboard - 133MHZ/100MHZ FSB &amp; PC133 SDRAM support - Coppermine
            CPU Support - DMA/66 Ready - PC133 64M SDRAM 168 Pins 7 ns Memory The
            Intel Pentium III processor offers great performance for today's and tomorrow's
            applications, as well as quality, reliability, and compatibility from the world's
            leading
            microprocessor company. Intel's latest Pentium III processors are manufactured using
            the advanced 0.18-micron process. This new generation of technology brings all the
            performance-enhancing features of the Pentium III processor into exciting new PC
            products. Available for both desktop and mobile users, the redesigned Pentium III
            processor with Advanced Transfer Cache means you have all the power and
            performance for today's and tomorrow's Internet applications. Mobile Pentium III
            processor featuring Intel SpeedStep technology lets you command the power of the
            Internet anytime, anywhere. For the Desktop, The Intel Pentium III processor is now
            available at up to 1.13 GHz. - FOR CONSUMERS Unleash the full multimedia
            capabilities of your Performance PC with the Pentium III processor -- including
            full-screen, full-motion video and realistic graphics for an enhanced, exciting Internet
            experience. With the new mobile Pentium III processor, take outstanding performance
            with you wherever you go! - FOR BUSINESS The Pentium III processor sets a new
            baseline for high-performance business desktop computing, and is also available for
            entry-level workstations and servers. And now, the new mobile Pentium III processor
            enables greater productivity on the go. - FOR DEVELOPERS Find the software, tools
            and technical information you need to optimize the power of the Pentium III processor.
            ** ** Warranty: 3 Months functional defect exchange warranty. ** The warranty of
            CPU, Memory and Mother board that have been mishandled or damaged is voided.
            Only those items that are determined to be free from damage will be exchanged or
            refunded. ************************** Buyer Pay $12.99 Shipping inside US via
            UPS. **** Shipping fees, return shipping costs are Non-Refundable. Physical damaged
            by improper handling or installation will not be honored. Support: Fax us 253 946-5719
            or email Cbear@cbear.net. Visit our website www.cbear.net for other products.
         </description>
      </item_info>
   </listing>
</root>`;

console.time("txml");
const resTxml = txml.parse(sampleXML, {simplify: true});
console.timeEnd("txml");


console.time("fxml");
// console.profile();
const res = parse(`<root>
   <firstChild>
      <grandchild/>
   </firstChild>
   <child>
      content
   </child>
   <another>
      <deep/>
   </another>
</root>`);
// const res = parse(sampleXML);
// console.profileEnd();
console.timeEnd("fxml");

fs.writeFileSync("txml.json", JSON.stringify(resTxml, undefined, 2));
fs.writeFileSync("fxml.json", JSON.stringify(res, undefined, 2));

console.log(JSON.stringify(res, undefined, 2));
